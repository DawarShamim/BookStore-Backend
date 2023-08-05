const mongoose = require('mongoose');

const clientreviewSchema = new mongoose.Schema({
    Book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
      },
    Client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
      },
  ReviewText: {
    type: String,
    MaxLength:1000,
  },
  Stars: {
    type: Integar,
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

const ClientReview = mongoose.model('ClientReview', clientreviewSchema);

module.exports = ClientReview;