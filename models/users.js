const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Blue whale',
  },

  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },

  password: {
    type: String,
    minLength: [6, 'password has to be six characters at least'],
    required: [true, 'password is required'],
    select: false,
  },

  daysPassed: {
    type: Number,
    default: 0,
  },

  level: {
    type: Number,
    default: 1,
  },

  xp: {
    type: Number,
    default: 0
  },

  wp: {
    type: Number,
    default: 10,
  },

  slots: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('user', userSchema);