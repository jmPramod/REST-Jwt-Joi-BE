const { default: mongoose } = require("mongoose");
const EmpSchema=require("../Model/EmpSchema")

const { schemaJoi } = require("../Model/joiValidaition");

let getAllUserController=async (req,res,next)=>{
      /*  
  #swagger.tags = ['User']
  #swagger.security = [{
    "apiKeyAuth": []
  }]
 
  }
  */

    try{
        let allUser=await EmpSchema.find({})
    
        res.status(200).json({Data:allUser})

    }
    catch(err){
        console.log("Error Msg: ",err);
        next(err);

    }
}

const singleUserController=async(req,res,next)=>{
  /*  
  #swagger.tags = ['User']
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  
  */



    try{
        let id=req.params.ID
        // console.log(id);
        let singleUser=await EmpSchema.findOne({_id:id})
      
        singleUser&&res.status(200).json({status:" Single User Fetched Success!!!",data:singleUser})
        
        
        !singleUser&&res.status(200).json({status:" User does not exist!!!"})


    }
    catch(err){
        console.log("Error Msg: ",err);
        next(err);

    }
}

const createUserController=async(req,res,next)=>{

  /*  
  #swagger.tags = ['User']
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  #swagger.parameters['data']  = {
    in: 'body',
    description: 'Fetch chapter content of the given URL',
    schema: {
      
      "name":"RAJ",
    "email": "RAJ@gmail.com",
    "password":"1234567890" 
    
    }
  }
  */


    try{


      const data = req.body;

      const {error,value}=await schemaJoi.validate(req.body)
      console.log("res123", {error,value});
      error&&next(error);
        const newEmp=new EmpSchema({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
    
        })
       await  newEmp.save()
        res.status(200).json({status:"User Created Success!!!",data:newEmp})

    }
    catch(err){
        
        // res.status(500).json({status:"User was not Created",ErrorMsg:err})
        console.log("Error Msg: ",err);
        next(err);

    }
}

const updateUserController=async(req,res,next)=>{
  /*  
  #swagger.tags = ['User']
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  #swagger.parameters['data']  = {
    in: 'body',
    description: 'Fetch chapter content of the given URL',
    schema: {
      
      "name":"RAJ kumar",
    "email": "RAJ@gmail.com",
    "password":"1234567890" 
    
    }
  }
  */

    let id=req.params.ID
    // console.log(id);

    try{
      // const {error,value}=await schemaJoi.validate(req.body)
      // console.log("res123", {error,value});
      // error&&next(error);
        const updateEmp= await EmpSchema.findOneAndUpdate({_id:id},{$set:{name:req.body.name, email:req.body.email,password:req.body.password}},  { new: true })

       updateEmp && res.status(200).json({status:"User Updated Success!!!",data:updateEmp})

       
      ! updateEmp && res.status(200).json({status:"User does not exist and Cant be Updated!!!"})

    }
    catch(err){
        
        // res.status(500).json({status:"User was not Updated",ErrorMsg:err})
        console.log("Error Msg: ",err);
        next(err);

    }
}

const deleteUserController=async(req,res,next)=>{
  /*  
  #swagger.tags = ['User']
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  
  */

    let id=req.params.ID
    // console.log(id);

    try{
        const deletedEmp= await EmpSchema.findOneAndDelete({_id:id})

        deletedEmp&&   res.status(200).json({status:"User Deleted Success!!!",data:deletedEmp})

        !deletedEmp&&   res.status(200).json({status:"User cant be Deleted , as it does not exist!!!"})

    }
    catch(err){
        
        // res.status(500).json({status:"User was not Deleted",ErrorMsg:err})
        console.log("Error Msg: ",err);
        next(err);

    }
}
module.exports ={getAllUserController,singleUserController,createUserController,updateUserController,deleteUserController}
