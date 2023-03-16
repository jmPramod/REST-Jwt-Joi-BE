let mongoose=require("mongoose")

let empModel=new mongoose.Schema({
    fName:{type:String,require:true},
    
    lName:{type:String,require:true},
    
    email:{type:String,require:true,unique:true},
    
    password:{type:String,require:true},
    
    phone:{type:String}


})

module.exports=mongoose.model("emp1",empModel)