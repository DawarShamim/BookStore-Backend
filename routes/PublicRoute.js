const express = require('express');
const router = express.Router();
const Book = require("../models/Book");
const Author = require("../models/Author");

// /public-api

router.get('/public-search/:searchText',
    async (req, res, next) => {
        try {
            const searchText = req.params.searchText;

            // Create a case-insensitive regular expression for partial matching
            const searchRegex = new RegExp(searchText, 'i');

            // Search for books with a partial match in the title
            const Books = await Book.find({ Title: searchRegex }).limit(6);
            const Authors = await Author.find({ Name: searchRegex }).limit(6);

            if (Books.length > 0) {
                return res.status(200).json({ FilteredBooks: Books, FilteredAuthors: Authors });
            } else {
                return res.status(404).json({ message: 'No Results Found' });
            }
        } catch (error) {
            next(error);
        }
    });

router.get('/swiper', async (req, res, next) => {
    try {
        const books = await Book.find()
            .sort({ Rating: -1 })
            .limit(20)
            .cache({ key: "home_swiper" });

        if (books.length === 0) {
            return res.status(404).json({ message: 'No Results Found' });
        }

        // Create an array of promises to fetch author details for each book
        const bookPromises = books.map(async (book) => {
            const author = await Author.findById(book.Author);
            // Combine the book and author details
            return {
                ...book.toObject(),
                Author: author ? author.Name : null,
            };
        });

        // Wait for all promises to resolve
        const booksWithAuthors = await Promise.all(bookPromises);

        return res.status(200).json({ SwiperBooks: booksWithAuthors });
    } catch (error) {
        next(error);
    }
});

module.exports = router;