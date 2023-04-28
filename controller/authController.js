const creatError = require("../utils/errorHandelling");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let UserModel = require("../Model/UserModel");
const { schemaJoi } = require("../Model/joiValidaition");

let register = async (req, res, next) => {
  /*  
  #swagger.tags = ['Login/Register']
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  #swagger.parameters['data']  = {
    in: 'body',
    description: 'Fetch chapter content of the given URL',
    schema: {
      
      "name":"ravi",
    "email": "ravi@gmail.com",
    "password":"1234567890" 
    
    }
  }
  */

  try {

    const { error, value } = await schemaJoi.validate(req.body);
    console.log("pramod_pavi",error);
    error && next(error);


    
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

 
    const user = await UserModel.findOne({ name: req.body.name });
if(user){
  return next(creatError(404, " user name  already exist!!"));
}
const emailexist = await UserModel.findOne({     email: req.body.email, });
if(emailexist){
  return next(creatError(404, "email already exist !!"));
}
if(!user && !emailexist) {
    await newUser.save();
    res.status(200).send({
      msg: "User has been created  successfully",
      user: newUser,
    });
    
  }

    
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  /*  
  #swagger.tags = ['Login/Register']
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  #swagger.parameters['data']  = {
    in: 'body',
    description: 'Fetch chapter content of the given URL',
    schema: {
      
        "name":"ravi",
    "email": "ravi@gmail.com",
    "password":"1234567890" 
    
    }
  }
  */

  try {
    const user = await UserModel.findOne({ name: req.body.name });

    if (!user) return next(creatError(404, "User not Found!!"));

    if (req.body.password !== user.password)
      return next(creatError(404, "wrong Password or user name !!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    let { password, ...otherDetails } = user._doc;
    res.cookie("access_token", token, { httpOnly: true });
    res.status(200).send({
      msg: "User has been Logged in successfully",
      details: otherDetails,
      access_token: token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };
