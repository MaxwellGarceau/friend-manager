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

const FilterSettingsSchema = new mongoose.Schema({
  name: {
    type: String
  },
  selectedFilters: {
    type: mongoose.Schema.Types.Mixed
  },
  rankingSliderValue: {
    type: mongoose.Schema.Types.Mixed
  },
  location: {
    type: mongoose.Schema.Types.Mixed
  },
  relationship: {
    type: mongoose.Schema.Types.Mixed
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});
const FilterSettings = mongoose.model('FilterSettings', FilterSettingsSchema);

module.exports = {
  Settings,
  FilterSettings
};
