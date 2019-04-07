const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  relationship: {
    type: mongoose.Schema.Types.Mixed
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = {
  Settings
};
