const express = require('express');
const router = express.Router();

const StoreController = require('../controllers/storeController');

 
router.get('/',StoreController.getAll);
router.post('/',StoreController.createNew); 

router.get('/:id',StoreController.getSpecificStore);
router.get('/:id/books',StoreController.getAllStoreBooks);
router.get('/:id/employees',StoreController.getAllStoreEmp);
router.get('/:id/booksales',StoreController.getAllSales);
router.put('/:id',StoreController.updateStore);


module.exports = router;