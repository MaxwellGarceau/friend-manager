// Initialize environment variables
require('./config/config');

const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
const { authenticate } = require('./middleware/user-authentication');

// Models
const { User } = require('./models/user');
const { Friend } = require('./models/friend');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

let port;
// Listens on a port exactly one number higher than specified in .env.development/.env.development
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  port = parseInt(process.env.PORT, 10) + 1 || 3000;

  // Loads test fixture data into mongo db
  const friendTestData = require('./tests/fixtures/friends-data').friends;
  friendTestData.map((testFriend) => {
    return mongoose.connection.collection('friends').replaceOne({ _id: testFriend._id }, testFriend, { upsert: true });
  });
} else {
  port = process.env.PORT;
}

app.use(bodyParser.json());

// Enables CORS for certain domains
app.use((req, res, next) => {
  const allowedOrigins = ['http://api.geonames.org'];
  const origin = req.headers.origin;
  console.log(origin);

  if (allowedOrigins.includes(origin)) {
    console.log('includes fired');
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// Add Friend
app.post('/api/friend', authenticate, async (req, res) => {
  try {
    const body = req.body;
    const friend = new Friend({
      _creator: req.user._id,
      ...body
    });

    const response = await friend.save();
    res.send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete Friend
app.delete('/api/friend/:_id', authenticate, async (req, res) => {
  const _id = req.params._id;

  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  try {
    const deletedFriend = await Friend.findOneAndRemove({
      _id,
      _creator: req.user._id
    });

    if (!deletedFriend) {
      res.status(404).send();
    }

    res.send(deletedFriend);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Edit Friend
app.patch('/api/friend/:_id', authenticate, async (req, res) => {
  const _id = req.params._id;
  const body = _.pick(req.body, ['name', 'relationship', 'ranking', 'location']);

  if (!ObjectID.isValid(_id)) {
    return res.status(404).send();
  }

  try {
    const editedFriend = await Friend.findOneAndUpdate({
      _id,
      _creator: req.user._id
    }, {$set: body}, {new: true});

    if (!editedFriend) {
      return res.status(404).send();
    }

    res.send(editedFriend);
  } catch (e) {
    res.status(400).send();
  }
});

// Get All Friends
app.get('/api/friend', authenticate, async (req, res) => {
  try {
    const response = await Friend.find({
      _creator: req.user._id
    });
    res.send(response);
  } catch (e) {
    res.status(400).send(e);
  }
});

// User Sign Up
app.post('/api/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password', 'signUpDate']);
    const user = new User(body);

    await user.save();

    // if (!user) {
    //   return res.status(400).send({ errorMessage: 'User already exists.' });
    // }

    const token = await user.generateAuthToken();
    const cookieProperties = {
      // httpOnly: true,
      // secure: true,
      expires: moment().add(1, 'h').toDate(),
      maxAge: moment().add(1, 'h').valueOf() - moment().valueOf()
    };
    res.cookie('jwtToken', token, cookieProperties);
    res.header('x-auth', token).send(user);
  } catch (e) {
    if (e.code === 11000 || e.code === 11001) {
      e.message = 'A user with this email already exists.';
    }
    res.status(400).send({ errorMessage: e.message });
  }
});

// POST /users/login {email, password} (Login)
app.post('/api/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    const cookieProperties = {
      // COOKIE DOESN'T WORK WITH "HTTPONLY" OR "SECURE" SET
      // httpOnly: true,
      // secure: true,
      expires: moment().add(1, 'h').toDate(),
      maxAge: moment().add(1, 'h').valueOf() - moment().valueOf()
    };
    res.cookie('jwtToken', token, cookieProperties);
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send({ errorMessage: e });
  }
});

// POST /users/me (Get User Info)
app.get('/api/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// DELETE /users/me/token (Logout)
app.delete('/api/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.clearCookie('jwtToken');
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}!`);
});
