const mongoose = require('mongoose');

const booksaleSchema = new mongoose.Schema({
Date: {
    type: Date,
    required: true,
  }, 
Books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }],
Store:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
Employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
TotalAmount:{
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
  }
});

const BookSales = mongoose.model('BookSales', booksaleSchema);

module.exports = BookSales;