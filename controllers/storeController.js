const Store = require("../models/Store");
const Employee =require("../models/Employee");
 
exports.createNew = async(req,res)=>{
    try{
        const name= req.body?.Name;
        const address= req.body?.Address;
        const state= req.body?.State;
        const phoneNumbers= req.body?.Phonenumber;

        const newStore =  new Store ({Name:name,
            Address:address,
            State:state,
            PhoneNumbers:phoneNumbers});
        await newStore.save();

    }catch(error){next(error);}
};

exports.updateStore = async(req,res,next)=>{
    try{
        const StoreID =req.params.id;

        const name= req.body?.Name;
        const address= req.body?.Address;
        const state= req.body?.State;
        const phoneNumbers= req.body?.Phonenumber;

        const updateData= {Name:name,
            Address:address,
            State:state,
            PhoneNumbers:phoneNumbers};

            // Find the book by ID and update the information
        const updatedStore = await Store.findByIdAndUpdate(
        StoreID,
        updateData,
        { new: true, runValidators: true } // Return the updated book and run validation
        );

        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
            }
        res.status(200).json(updatedStore);

    }catch(error){
        next(error);
    }
};

exports.getAll = async(req,res,next)=>{
    try{
        const StoreInfo = await Store.find();
        if (!StoreInfo) {
            return res.status(404).json({ message: 'Stores not found' });
        }
        res.status(200).json(StoreInfo);

    }catch(error){
        next(error);
    }
};

exports.getSpecificStore = async(req,res)=>{
    try{
        const StoreID =req.params.id;

            // Find the book by ID 
        const StoreInfo = await Store.find(StoreID);

        if (!StoreInfo) {
            return res.status(404).json({ message: 'Stores not found' });
        }
        res.status(200).json(StoreInfo);

    }catch(error){
        next(error);
    }
};

exports.getAllStoreBooks = async(req,res,next)=>{
    try{
        const StoreID =req.params.id;

            // Find the book by ID 
        const StoreInfo = await Store.find(StoreID);

        if (!StoreInfo) {
            return res.status(404).json({ message: 'Stores not found' });
        }
        res.status(200).json(StoreInfo);

    }catch(error){
        next(error);
    }
};

exports.getAllStoreEmp = async(req,res,next)=>{try{
    const StoreID =req.params.id;
        // Find the book by ID 
    const StoreInfo = await Store.find(StoreID);
    if (!StoreInfo) {
        return res.status(404).json({ message: 'Stores not found' });
    }else{
    const Employees = await Employee.find({ _id: { $in: StoreInfo.Employees } });
    res.status(200).json(Employees);
    }

}catch(error){
    next(error);
}
};
const BookSale = require("../models/BookSales");

exports.getAllSales = async(req,res,next)=>{
    try{
    const StoreID =req.params.id;
    const Sales = await BookSale.find({Store:StoreID});
    if(!Sales){
        return res.status(404).json({message:"No Sales Found"});
    }else{
        return res.status(200).json(Sales);

    }
    }
    catch(error){}
};


