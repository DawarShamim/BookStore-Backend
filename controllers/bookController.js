const Book = require("../models/Book");
const AuthorModel = require("../models/Author");
const ClientReview = require("../models/ClientReviews");
const mongoose = require('mongoose');

exports.createNew = async (req, res) => {
    try {
        const title = req.body?.Title;
        const isbn_code = req.body?.Isbn;
        const description = req.body?.Description;
        const genre = req.body?.Genre;
        const price = req.body?.Price;

        const newBook = new Book({
            Title: title,
            Isbn_code: isbn_code,
            Description: description,
            Genre: genre,
            Price: price
        });

        await newBook.save();
        res.status(200).json({ message: "Book Saved", book: newBook });
    }
    catch (error) {
        next(error);
    }
};

exports.createNewBookWithAuthor = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const name = req.body?.Name;
        const description = req.body?.Description;
        const website = req.body?.Website;

        const newAuthor = new AuthorModel({
            Name: name,
            Description: description,
            Website: website,
        });

        const savedAuthor = await newAuthor.save({ session });

        const title = req.body?.Title;
        const isbn_code = req.body?.Isbn;
        const bookDescription = req.body?.BookDescription;
        const genre = req.body?.Genre;
        const price = req.body?.Price;

        const newBook = new Book({
            Title: title,
            Isbn_code: isbn_code,
            Description: bookDescription,
            Genre: genre,
            Price: price,
            Author: savedAuthor._id,
        });

        const savedBook = await newBook.save({ session });

        // Update the Author document with the Book reference
        savedAuthor.Books.push(savedBook._id);
        await savedAuthor.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'Author and Book created successfully', author: savedAuthor, book: savedBook });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const allBooks = await Book.find();

        if (allBooks.length > 0) {
            res.status(200).json({ books: allBooks });
        } else {
            res.status(404).json({ message: 'No books found.' });
        }
    } catch (error) {
        next(error);
    }
};


exports.getSpecificBook = async (req, res, next) => {
    try {
        const BookId = req.params.id;

        // Find Book by ID
        const book = await Book.findById(BookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

exports.updateSpecificBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;

        const title = req.body?.Title;
        const isbn_code = req.body?.Isbn;
        const description = req.body?.Description;
        const genre = req.body?.Genre;
        const price = req.body?.Price;

        const updateData = {
            Title: title,
            Isbn_code: isbn_code,
            Description: description,
            Genre: genre,
            Price: price
        };

        // Find the book by ID and update the information
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            updateData,
            { new: true, runValidators: true } // Return the updated book and run validation
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        next(error);
    }
};

exports.getAuthorofBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;

        // Find the book by ID
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Retrieve the author ID from the book document
        const authorId = book.Author;
        // Find the author by ID
        const author = await AuthorModel.findById(authorId);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

exports.getReviewofBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        // Find the book by ID
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Retrieve the review IDs from the book document
        const reviewIds = book.Review; // Assuming you have a 'Reviews' field in the Book schema

        // Find the reviews by IDs in the BookReview collection
        const bookReviews = await ClientReview.find({ _id: { $in: reviewIds } });

        if (!bookReviews || bookReviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this book' });
        }

        res.status(200).json(bookReviews);
    } catch (error) {
        next(error);
    }
};

