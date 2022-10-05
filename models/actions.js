const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    description: String, reward: Number, name: String, repeatable: Boolean
}, { collection: 'actions'});

module.exports = mongoose.model('action', actionSchema);