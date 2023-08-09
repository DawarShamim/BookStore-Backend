const BookSale = require("../models/BookSales");
const Book = require("../models/Book");
const Employee = require("../models/Employee");
const Store = require('../models/Store'); // Import the Store model


exports.createNew = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const employeeId = req.user.id; // Assuming you have user authentication middleware that provides user information
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const storeId = employee.Store;
        const booksArray = req.body?.Bookid;
        const books = await Book.find({ _id: { $in: booksArray } });
        const totalAmount = books.reduce((acc, book) => acc + book.Price, 0);

        const newBookSale = new BookSale({
            Date: new Date(),
            Books: booksArray,
            Store: storeId,
            Employee: employeeId,
            TotalAmount: totalAmount,
        });

        await newBookSale.save({ session });

        // Subtract sold books from the Store document
        const store = await Store.findById(storeId).session(session);

        booksArray.forEach(bookId => {
            const bookInStore = store.Books.find(book => book.book.toString() === bookId);
            if (bookInStore) {
                if (bookInStore.numberOfCopies === 1) {
                    // If only 1 copy left, remove the book from the array
                    store.Books.pull(bookInStore);
                } else {
                    // Reduce the number of copies
                    bookInStore.numberOfCopies -= 1;
                }
            }
        });

        await store.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: 'New Sales Generated', Sales: newBookSale });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};


exports.getAll = async (req, res, next) => {
    try {
        const query = req.query; // Query parameters (if any)

        let allSales;
        if (Object.keys(query).length === 0) {
            // No query parameters, retrieve all book sales
            allSales = await BookSale.find();
        } else {
            // Use query parameters to filter book sales
            allSales = await BookSale.find(query);
        }

        res.status(200).json(allSales);
    } catch (error) {
        next(error);
    }
};

