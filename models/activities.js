const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  description: String, name: String, src: String,

  bought: {
    type: Boolean,
    default: false
  },

  rank: {
    type: Number,
    default: 1
  },

  nextLevelAt: {
    type: Number,
  },

  completed: {
    type: Number,
    default: 0
  },

  step: {
    type: Number,
    default: 1
  }

}, { collection: 'activities'});

module.exports = mongoose.model('activity', activitySchema);