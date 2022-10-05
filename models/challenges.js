const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    description: String, reward: Number, name: String, repeatable: Boolean
}, { collection: 'challenges'});

module.exports = mongoose.model('challenge', challengeSchema);