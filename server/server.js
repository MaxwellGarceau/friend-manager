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
// Listens on a port exactly one number higher than specified in .env.development/.env.development
const port = parseInt(process.env.PORT, 10) + 1 || 3000;

// Loads test fixture data into mongo db
const friendTestData = require('./tests/fixtures/friends-data').friends;
friendTestData.map((testFriend) => {
  return mongoose.connection.collection('friends').replaceOne({ _id: testFriend._id }, testFriend, { upsert: true });
});

app.use(bodyParser.json());

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
    res.status(400).send(e);
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
    res.status(400).send(e);
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

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}!`);
});
