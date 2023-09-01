const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    unique: true
  },
  Isbn_code: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true
  },
  Genre: {
    type: String,
    required: true
  },
  Rating: {
    type: Number,
    required: true,
    default: 0
  },
  Price: {
    type: Number,
    required: true
  },
  ImageUrl: { 
    type: String, // Image url
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  Store: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    }],
  Review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
