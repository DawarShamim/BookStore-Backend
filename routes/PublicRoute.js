const express = require('express');
const router = express.Router();

const Book = require("../models/Book");
const Author = require("../models/Author");

router.get('/public-search/:searchText',
    async (req, res, next) => {
        try {
            const searchText = req.params.searchText;
            console.log("Search Text", searchText);

            // Create a case-insensitive regular expression for partial matching
            const searchRegex = new RegExp(searchText, 'i');
            console.log(searchRegex);

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

router.get('/swiper',
    async (req, res, next) => {
        try {
            const searchText = req.params.searchText;
            console.log("Search Text", searchText);

            // Create a case-insensitive regular expression for partial matching
            const searchRegex = new RegExp(searchText, 'i');
            console.log(searchRegex);

            // Search for books with a partial match in the title
            const Books = await Book.find({ Title: searchRegex }).limit(20);

            if (Books.length > 0) {
                return res.status(200).json({ SwiperBooks: Books });
            } else {
                return res.status(404).json({ message: 'No Results Found' });
            }
        } catch (error) {
            next(error);
        }
    });

module.exports = router;