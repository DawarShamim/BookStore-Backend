const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const upload = require('../Utils/MulterConfig');

 
router.get('/',BookController.getAll);
router.post("/",upload.single('Image'),BookController.createNewBookWithAuthor);
router.post('/book',BookController.createNew); 

router.get('/:id',BookController.getSpecificBook);
router.put('/:id',BookController.updateSpecificBook);
router.get('/:id/authors',BookController.getAuthorofBook);
router.get('/:id/reviews',BookController.getReviewofBook);

module.exports = router;