const express=require("express")
const { default: mongoose } = require("mongoose")
const { createEmpController ,getEmpController,editEmpController,deleteEmpController} = require("./controller/empController")
const app=express()
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
res.send("<h1>Welcome to Node JS</h1>")
})


app.post("/emp",createEmpController)


app.get("/emp",getEmpController)


app.put("/emp",editEmpController)


app.delete("/emp",deleteEmpController)



const connectToDataBase=()=>{
    try{
        mongoose.set("strictQuery",true)
        mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
console.log("connecte to Atlas DataBase!!!");
    }
    catch(err){
console.log(err);
    }
}
connectToDataBase()
app.listen(4500,()=>{
console.log("port running on 4500");
})