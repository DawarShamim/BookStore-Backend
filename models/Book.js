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
  Price: {
    type: Number,
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