const express = require('express');
const router = express.Router();

const StoreController = require('../controllers/storeController');


// /api/stores
 
router.post('/',StoreController.createNew); 
router.put('/:id',StoreController.updateStore);
router.patch('/:id/addbook',StoreController.addBooks);

router.get('/',StoreController.getStore);
router.get('/:id',StoreController.getStore);

router.get('/:id/books',StoreController.getAllStoreBooks);
router.get('/:id/employees',StoreController.getAllStoreEmp);
router.get('/:id/booksales',StoreController.getAllSales);


module.exports = router;