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
  Books:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }],
  Website: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;

