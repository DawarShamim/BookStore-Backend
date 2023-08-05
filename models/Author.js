const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
   },
  Description: {
    type: String,
    required: true,
  },
  Books: {
    type: String,
    required: true
  },
  Website: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;

