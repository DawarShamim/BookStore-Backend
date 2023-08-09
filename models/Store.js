
Employees

const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true
  },
  Address: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true
  },
  PhoneNumbers: [{
    type: String,
    required: true
  }],
  Employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    }],
  Books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
      },
      numberOfCopies: {
        type: Number,
        default: 1 // Default number of copies if not provided
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },

});

const Store = mongoose.model('Store', userSchema);

module.exports = Store;
