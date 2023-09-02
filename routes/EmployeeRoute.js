const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employeeController');

// /api/employee


router.get('/',EmployeeController.getEmployees);
router.get('/:id',EmployeeController.getEmployees);
router.post('/',EmployeeController.createNew); 
// router.get('/:id',EmployeeController.getSpecficEmployee);
router.put('/:id',EmployeeController.updateEmployee); 
router.patch('/:id',EmployeeController.ChangeActiveStatus); 



module.exports = router;