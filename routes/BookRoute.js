const express = require('express');
const router = express.Router();

const BookController = require('../controllers/bookController');


 
router.get('/',BookController.getAll);
router.post('/',BookController.createNew); 

router.get('/:id',BookController.getSpecificBook);
router.put('/:id',BookController.updateSpecificBook);
router.get('/:id/authors',BookController.getAuthorofBook);
router.get('/:id/reviews',BookController.getReviewofBook);

module.exports = router;