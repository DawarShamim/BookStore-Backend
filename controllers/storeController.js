const Store = require("../models/Store");
const Employee = require("../models/Employee");
const BookSale = require("../models/BookSales");

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
exports.getStore = async (req, res, next) => {
    try {
        const StoreId = req.params.id;
        let Stores;
        if (StoreId) {
            Store = await Store.find(StoreId);
            if (!Store) {
                return res.status(404).json({ message: "Store Not found" });
            }
            Stores = [Store];
        } else {
            Stores = await Store.find({});
            if (Stores.length === 0) {
                return res.status(404).json({ message: 'No Stores found' });
            }
        }
        res.status(200).json({ Stores: Stores });
    } catch (error) {
        next(error);
    }
};
//Admin, Store
exports.getAllStoreBooks = async (req, res, next) => {
    try {
        const storeID = req.params.id;

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