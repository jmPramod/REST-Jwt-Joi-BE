const mongoose=require("mongoose")


let EmpModel=mongoose.Schema({
    name:{type:String,require:true},
    email:{unique:true , type: String, required: true },
    password:{ type: String, required: true },
})

module.exports=mongoose.model("EmpModel",EmpModel)