let EmpSchema=require("../Model/EmpSchema")


let createEmpController=async(req,res)=>{
try{
    let newPerson= new EmpSchema({
        fName:req.body.fName,
        LName:req.body.LName,
        email:req.body.email,
        password:req.body.password,  fName:req.body.fName,
        phone:req.body.phone,
    
    })
    let val=await newPerson.save()
    res.json({empData:val})
}
catch(err){

}
}


let getEmpController=async(req,res)=>{
try{

let fetched=await EmpSchema.find({})
res.json({allEmp:fetched})


}   
catch(err){
res.json({ERROR:{err}})
} 
}
let editEmpController=async(req,res)=>{
    
    try{
let edit=await EmpSchema.findOneAndUpdate({email:req.body.email},{$set:req.body},{new:true}) 
res.json({edited:true,data:edit})    
}
    catch(err){

        res.json({ERROR:{err}})
    }
}
let deleteEmpController=async(req,res)=>{
try{
    await EmpSchema.findOneAndDelete({email:req.body.email})   
    res.json({msg:"data deleted successfully"}) 
}
catch(err){
    res.json({ERROR:{err}})
}
}


module.exports={ createEmpController ,getEmpController,editEmpController,deleteEmpController}