const express = require('express');
const router = express.Router();

const ClientReviewController = require('../controllers/clientreviewController');


// /api/reviews

router.post('/',ClientReviewController.createNew); 

module.exports = router;