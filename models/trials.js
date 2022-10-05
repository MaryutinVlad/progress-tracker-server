const mongoose = require('mongoose');

const trialSchema = new mongoose.Schema({
    name: String, description: String, cost: Number, baseReward: Number, incReward: Number, maxReward: Number
}, { collection: 'trials'});

module.exports = mongoose.model('trial', trialSchema);