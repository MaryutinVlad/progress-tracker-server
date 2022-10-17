const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: String, description: String, reward: Number, cost: Number, source: String,
  achieved: {
    type: Boolean,
    default: false
  }
}, { collection: 'achievements' });

module.exports = mongoose.model('achievement', achievementSchema);