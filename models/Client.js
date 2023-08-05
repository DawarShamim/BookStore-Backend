const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  }, 
  Address: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
