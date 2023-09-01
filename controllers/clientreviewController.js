const ClientReview = require("../models/ClientReviews");
const Book = require ("../models/Book"); 

const mongoose = require('mongoose');

exports.createNew = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const bookId = req.body?.BookId;
        const clientId = req.user.id;
        const reviewText = req.body?.Reviewtext;
        const stars = req.body?.Stars;

        const newClientReview = new ClientReview({
            Book: bookId,
            Client: clientId,
            ReviewText: reviewText,
            Stars: stars
        });

        await newClientReview.save({ session });

        // Update the book's rating
        const existingReviews = await ClientReview.find({ Book: bookId });
        const totalReviews = existingReviews.length;
        const existingTotalStars = existingReviews.reduce((sum, review) => sum + review.Stars, 0);
        const newTotalStars = existingTotalStars + stars;
        const newAverageRating = newTotalStars / (totalReviews + 1);

        // Update the book's rating in the Book model
        await Book.findByIdAndUpdate(bookId, { Rating: newAverageRating }, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Client Review created', ClientReview: newClientReview });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};


exports.getSpecificBookReviews = async (req, res) => {
    try {
        const BookID = req.params?.bookId;
        const BookReview = ClientReview.find({ Book: BookID });
        if (!BookReview) {
            return res.status(404).json({ message: "No Reviews Found" });
        } else {
            res.status(200).json({ Review: BookReview });
        }
    } catch (error) {
        next(error);
    }
};

