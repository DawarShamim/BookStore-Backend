const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  BirthDate: {
    type: Date,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  HireDate: {
    type: String,
    required: true
  },
  EmployeeNumber: {
    type: String,
    required: true,
    unique: true
  },
  Store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  Active:{
    type:Boolean,
    default:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

