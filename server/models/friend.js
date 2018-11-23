const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
  },
  order: {
    default: {
      type: Number,
      required: true
    }
  },
  relationship: {
    type: String,
    require: true
  },
  location: {
    country: {
      type: String,
      require: false
    },
    countryId: {
      type: String,
      require: false
    },
    region: {
      type: String,
      require: false
    },
    regionId: {
      type: String,
      require: false
    },
    city: {
      type: String,
      require: false
    },
    cityId: {
      type: String,
      require: false
    }
  },
  ranking: {
    type: Number,
    require: false
  },
  dateAdded: {
    type: String,
    require: true
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = {
  Friend
};
