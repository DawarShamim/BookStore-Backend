const mongoose = require('mongoose');
const Employee = require("../models/Employee");
const User = require("../models/User");
const Store = require("../models/Store");


exports.createNew = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log(req.body?.Username);

    try {

        const name = req.body?.Name;
        const StoreAddress = req.body?.StoreAddress;
        const state = req.body?.State;
        const phoneNumbers = req.body?.PhoneNumbers;

        let existingStore = await Store.findOne({ Name: name, Address: StoreAddress });
        if (!existingStore) {
            const newStore = new Store({
                Name: name,
                Address: StoreAddress,
                State: state,
                PhoneNumbers: phoneNumbers
            });
            existingStore = await newStore.save({ session });
        }

        const firstName = req.body?.Firstname;
        const lastName = req.body?.Lastname;
        const birthDate = req.body?.Birthdate;
        const address = req.body?.Address;
        const phone = req.body?.Phone;
        const email = req.body?.Email;
        const hireDate = req.body?.Hiredate;

        const newEmployee = new Employee({
            FirstName: firstName,
            LastName: lastName,
            BirthDate: birthDate,
            Address: address,
            Phone: phone,
            Email: email,
            HireDate: hireDate,
            EmployeeNumber: await generateEmployeeNumber(),
            Store: existingStore._id
        });

        const savedEmployee = await newEmployee.save({ session });

        existingStore.Employees.push(savedEmployee._id);
        await existingStore.save({ session });

        const username = req.body?.Username;
        const password = username + "123";

        let newUser = await User.findOne({ Username: username });
        if (!newUser) {
            newUser = new User({
                Username: username,
                Password: password,
                Role: 'Employee',
                _id: savedEmployee._id
            });
            await newUser.save({ session });
        } else {
            return res.status(409).json({ message: "Username not available" });
        }
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: 'Employee Created', Employee: savedEmployee, User: newUser });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};


async function generateEmployeeNumber() {
    const lastEmployee = await Employee.findOne({}, {}, { sort: { 'EmployeeNumber': -1 } });
    if (!lastEmployee) {
        return 'EMP001'; // If no employees exist yet, start with EMP001
    }

    // Extract the number part and increment it
    const lastNumber = parseInt(lastEmployee.EmployeeNumber.slice(3), 10);
    const newNumber = lastNumber + 1;

    // Pad the new number with leading zeros
    const paddedNumber = `EMP${newNumber.toString().padStart(3, '0')}`;
    return paddedNumber;
}


exports.getAll = async (req, res, next) => {
    try {
        await Employee.find();
    } catch (error) {
        next(error);
    }
};

exports.getSpecficEmployee = async (req, res, next) => {
    try {
        const EmpID = req.params.id;
        const employee = await Employee.find(EmpID);
        if (!employee) {
            return res.status(404).json({ message: "No Employee Found" })
        } else {
            return res.status(200).json({ Employee: employee });
        }
    } catch (error) {
        next(error);
    }
};

exports.updateEmployee = async (req, res, next) => {
    try {
        const EmpID = req.params.id;

        const firstName = req.body?.Firstname;
        const lastName = req.body?.Lastname;
        const birthDate = req.body?.Birthdate;
        const address = req.body?.Address;
        const phone = req.body?.Phone;
        const email = req.body?.Email;
        const hireDate = req.body?.Hiredate;

        const updateData = {
            FirstName: firstName,
            LastName: lastName,
            BirthDate: birthDate,
            Address: address,
            Phone: phone,
            Email: email,
            HireDate: hireDate,
        };

        // Find the book by ID and update the information
        const updatedEmployee = await Employee.findByIdAndUpdate(
            EmpID,
            updateData,
            { new: true, runValidators: true } // Return the updated book and run validation
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        next(error)
    };
};

