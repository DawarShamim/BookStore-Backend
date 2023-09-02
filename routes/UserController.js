const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

// /api/user

router.patch('/',UserController.updatePassword);

module.exports = router;