const express = require('express');
const router = express.Router();

const BookSaleController = require('../controllers/booksaleController');

// /api/booksales

 
router.get('/',BookSaleController.getAll);
router.post('/',BookSaleController.createNew); 




module.exports = router;