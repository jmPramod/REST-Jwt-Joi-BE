const creatError=( status,message)=>{
   
const err=new Error()
err.status=status
err.message=message
// console.log("creatError2",err);
return err
}

module.exports=creatError