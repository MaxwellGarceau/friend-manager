const mongoose = require('mongoose');
// const validator = require('validator');
// const { CustomValidation } = require('../../src/utils/custom-validation/user-custom-validation');
// const customValidation = new CustomValidation();

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
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
    region: {
      type: String,
      require: false
    },
    city: {
      type: String,
      require: false
    }
  },
  ranking: {
    type: Number,
    require: false
  },
  dateAdded: {
    type: Date,
    require: true
  }
});

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = {
  Friend
};
