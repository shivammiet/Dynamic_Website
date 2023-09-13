const mongoose = require('mongoose');
const validator = require('validator'); // Import the validator library

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  });
  

const User = mongoose.model('User', userSchema);

module.exports = User;
