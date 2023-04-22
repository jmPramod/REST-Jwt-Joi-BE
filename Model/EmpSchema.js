const mongoose=require("mongoose")

let EmpModel=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
})

module.exports=mongoose.model("EmpModel",EmpModel)