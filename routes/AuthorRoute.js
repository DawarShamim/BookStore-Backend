const express = require('express');
const router = express.Router();

const AuthorController = require('../controllers/authorController');

router.post('/',AuthorController.createNew); 
router.get('/',AuthorController.getAll);

router.put('/:id',AuthorController.updateAuthor);

router.get('/:id',AuthorController.getSpecificAuthor);
router.get('/:id/books',AuthorController.getSpecificAuthorBooks);

module.exports = router;
