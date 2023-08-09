const BookSale = require("../models/BookSales");
const Book = require("../models/Book");
const Employee = require("../models/Employee");

exports.createNew = async(req,res)=>{
    try{

        const employeeId = req.user.id;
        const employee= Employee.find(employeeId);
        const StoreId = employee.Store;
        const booksArray = req.body?.Bookid; 
        const books = await Book.find({ _id: { $in: booksArray } });
        const totalAmount = books.reduce((acc, book) => acc + book.Price, 0);

        const newBookSale = new BookSale({
            Date: new Date(),
            Books: booksArray,
            Store: StoreId,
            Employee: employeeId,
            TotalAmount: totalAmount,
          });

    res.status(200).json({message:"New Sales Generated",Sales:newBookSale})
    }catch(error){
        next(error);
    };
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
  
    