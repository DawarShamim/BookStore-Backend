const Author = require("../models/Author");
const Book = require('../models/Book');

exports.createNew = async (req, res, next) => {
    try {
        const name = req.body?.Name;
        const description = req.body?.Description;
        const website = req.body?.Website;

        const newAuthor = new Author({
            Name: name,
            Description: description,
            Website: website,
        });

        await newAuthor.save(); // Save the new author to the database
        // Send a response to the client indicating success
        res.status(200).json({ message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        next(error);
        // Handle any errors that occurred during the process
        //   console.error('Error creating author:', error);
        //   res.status(500).json({ message: 'Failed to create author' });
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const allAuthors = await Author.find();

        if (allAuthors.length > 0) {
            res.status(200).json(allAuthors);
        } else {
            res.status(404).json({ message: 'No authors found.' });
        }
    } catch (error) {
        next(error);
    }
};


exports.updateAuthor = async (req, res, next) => {
    try {
        const authorID = req.params.id;

        const name = req.body?.Name;
        const description = req.body?.Description;
        const website = req.body?.Website;

        // Create an object with the properties to update
        const updateData = {
            Name: name,
            Description: description,
            Website: website
        };

        // Find the author by ID and update the information
        const updatedAuthor = await Author.findByIdAndUpdate(
            authorID,
            updateData,
            { new: true, runValidators: true } // Return the updated author and run validation
        );

        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json(updatedAuthor);
    } catch (error) {
        next(error);
    }
};

exports.getSpecificAuthor = async (req, res, next) => {
    try {
        const authorID = req.params.id;

        // Find the author by ID
        const author = await Author.findById(authorID);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
};

exports.getSpecificAuthorBooks = async (req, res, next) => {
    try {
        const authorID = req.params.id;

        // Find the author by ID
        const author = await Author.findById(authorID);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const authorBooksIds = author.Books;

        // Find all books where _id is in the author's Books array
        const authorBooks = await Book.find({ _id: { $in: authorBooksIds } });

        res.status(200).json(authorBooks);
    } catch (error) {
        next(error);
    }
};
