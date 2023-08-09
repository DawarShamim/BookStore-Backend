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
    catch(error){
        next(error);
    }
};

exports.getAll = async(req,res,next)=>{
try{
    await Employee.find();
}catch(error){
    next(error);
}    
};

exports.getSpecficEmployee= async(req,res,next)=>{
    try{
        const EmpID =req.params.id;
        const employee = await Employee.find(EmpID);
        if (!employee){
            return res.status(404).json({message:"No Employee Found"})
        }else{
            return res.status(200).json({Employee:employee});
        }
    }catch(error){
        next(error);
    }
};
exports.updateEmployee= async(req,res,next)=>{
    try{
        const EmpID =req.params.id;

        const firstName = req.body?.Firstname ;
        const lastName = req.body?.Lastname ;
        const birthDate = req.body?.Birthdate;
        const address = req.body?.Address;
        const phone= req.body?.Phone;
        const email= req.body?.Email;
        const hireDate= req.body?.Hiredate;

        const updateData= {
            FirstName:firstName,
            LastName:lastName,
            BirthDate:birthDate,
            Address:address,
            Phone:phone,
            Email:email,
            HireDate:hireDate,
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
    }catch(error){
        next(error)
    };
}; 

