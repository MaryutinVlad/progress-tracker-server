const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    description: String, cost: Number, name: String, src: String,
    bought: {
      type: Boolean,
			default: false
    }
}, { collection: 'zones'});

module.exports = mongoose.model('zone', zoneSchema);