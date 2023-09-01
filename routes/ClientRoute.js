const express = require('express');
const router = express.Router();

const ClientController = require('../controllers/clientController');

// /api/client
router.get('/',ClientController.getAll);
router.post('/',ClientController.createNew);

router.get('/:id',ClientController.getSpecificClient);
router.put('/:id',ClientController.updateClient);

module.exports = router;