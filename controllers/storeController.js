const Store = require("../models/Store");
const Employee = require("../models/Employee");
const BookSale = require("../models/BookSales");

//Admin
exports.createNew = async (req, res, next) => {
    try {
        const name = req.body?.Name;
        const address = req.body?.Address;
        const state = req.body?.State;
        const phoneNumbers = req.body?.PhoneNumbers;

        const newStore = new Store({
            Name: name,
            Address: address,
            State: state,
            PhoneNumbers: phoneNumbers
        });
        await newStore.save();

        res.status(200).json({ message: 'Store created', store: newStore });
    } catch (error) {
        next(error);
    }
};
//Admin
exports.updateStore = async (req, res, next) => {
    try {
        const storeID = req.params.id;

        const name = req.body?.Name;
        const address = req.body?.Address;
        const state = req.body?.State;
        const phoneNumbers = req.body?.PhoneNumbers;

        const updateData = {
            Name: name,
            Address: address,
            State: state,
            PhoneNumbers: phoneNumbers
        };

        // Find the store by ID and update the information
        const updatedStore = await Store.findByIdAndUpdate(
            storeID,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(updatedStore);

    } catch (error) {
        next(error);
    }
};
//Admin
exports.getAll = async (req, res, next) => {
    try {
        const allStores = await Store.find();
        res.status(200).json(allStores);

    } catch (error) {
        next(error);
    }
};
//Store
exports.addBooks = async (req, res, next) => {
    try {
        const storeId = req.params.storeId; 
        // Retrieve the store by ID
        const store = await Store.findById(storeId);

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        const BookID = req.body?.bookID;
        const numberOfCopies = req.body?.NumberOfCopies; 

        // Add the new book to the store's Books array along with the number of copies
        store.Books.push({
            book: BookID,
            numberOfCopies: numberOfCopies,
        });

        // Save the updated store document
        await store.save();

        res.status(200).json({ message: 'Book added to inventory', store: store });
    } catch (error) {
        next(error);
    }
};

//Admin
exports.getSpecificStore = async (req, res, next) => {
    try {
        const storeID = req.params.id;

        // Find the store by ID
        const storeInfo = await Store.findById(storeID);

        if (!storeInfo) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json(storeInfo);

    } catch (error) {
        next(error);
    }
};
//Admin, Store
exports.getAllStoreBooks = async (req, res, next) => {
    try {
        const storeID = req.params.id;

        // Find the store by ID
        const storeInfo = await Store.findById(storeID);

        if (!storeInfo) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const storeBooks = storeInfo.Books;
        res.status(200).json(storeBooks);

    } catch (error) {
        next(error);
    }
};
//Admin, Store
exports.getAllStoreEmp = async (req, res, next) => {
    try {
        const storeID = req.params.id;

        // Find the store by ID
        const storeInfo = await Store.findById(storeID);

        if (!storeInfo) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const employees = await Employee.find({ _id: { $in: (storeInfo.Employees) } });
        res.status(200).json(employees);

    } catch (error) {
        next(error);
    }
};
//Admin, Store
exports.getAllSales = async (req, res, next) => {
    try {
        const storeID = req.params.id;

        const sales = await BookSale.find({ Store: storeID });
        res.status(200).json(sales);
    } catch (error) {
        next(error);
    }
};