const Store = require("../models/Store");
 
exports.createNew = async(req,res)=>{
    try{
        const Name= req.body?.name;
        const Address= req.body?.address;
        const State= req.body?.state;
        const PhoneNumbers= req.body?.phonenumber;

        new Store = {Name,Address,State ,PhoneNumbers};
        await Store.save();
    }catch{}
};

exports.getAll = async(req,res)=>{};


exports.getSpecificStore = async(req,res)=>{};

exports.getAllStoreBooks = async(req,res)=>{};

exports.getAllStoreEmp = async(req,res)=>{};

exports.getAllSales = async(req,res)=>{};

exports.updateStore = async(req,res)=>{};

