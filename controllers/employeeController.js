const Employee = require("../models/Employee");
 

exports.createNew = async(req,res)=>{
    try{
        const firstName = req.body?.Firstname ;
        const lastName = req.body?.Lastname ;
        const birthDate = req.body?.Birthdate;
        const address = req.body?.Address;
        const phone= req.body?.Phone;
        const email= req.body?.Email;
        const hireDate= req.body?.Hiredate;
        const employeeNumber =req.body?.Employeenumber;

        const newEmployee = new Employee ={
            FirstName:firstName,
            LastName:lastName,
            BirthDate:birthDate,
            Address:address,
            Phone:phone,
            Email:email,
            HireDate:hireDate,
            EmployeeNumber:employeeNumber };
        await newEmployee.save();
        return res.status(200).json({message:"Employee Created", Employee,newEmployee});
    }
    catch{
        next(error);
    }
};

exports.getAll = async(req,res,next)=>{
try{
    await Employee.find();
}catch{
    next(error);
}    
};

exports.getSpecficEmployee= async(req,res)=>{};
exports.updateEmployee= async(req,res)=>{}; 

