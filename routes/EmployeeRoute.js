const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employeeController');


 
router.get('/',EmployeeController.getAll);
router.post('/',EmployeeController.createNew); 
router.get('/:id',EmployeeController.getSpecficEmployee);
router.put('/:id',EmployeeController.updateEmployee); 


module.exports = router;