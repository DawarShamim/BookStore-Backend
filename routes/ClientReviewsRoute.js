const express = require('express');
const router = express.Router();

const ClientReviewController = require('../controllers/clientreviewController');

router.post('/',ClientReviewController.createNew); 

module.exports = router;