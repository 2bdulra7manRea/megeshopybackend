var mongoose=require('mongoose');
var Client=require('../models/databaseUser')
var bcrypt=require('bcrypt');
var token=require('jsonwebtoken');




module.exports.User_Register= async (req,res)=>{
//hash password
let salt= await bcrypt.genSalt();
let hash=await bcrypt.hash(req.body.password ,salt)
Client.create({
clientName:req.body.name,
password:hash,
email:req.body.email,
favColor:req.body.color
}).then((backData)=>{
//creat token    
token.sign({id:backData._id},process.env.SECRET,(err,TokenUser)=>{
if(err){
res.status(403).json({message:'you are not authariezed'})
console.log("token", err)
}else{
res.status(200).json({token:TokenUser})
console.log("token treu" , TokenUser)
}
})
}).catch((errDATA)=>{
console.log(errDATA)
res.json({message:"something wrong in database"})
})
}



module.exports.User_LOGIN=(req,res)=>{
Client.findOne({email:req.body.email}).then((database)=>{
if(database){
bcrypt.compare(req.body.password,database.password,(err,result)=>{
if(result){
token.sign({id:database._id},process.env.SECRET,(err,Token)=>{
res.json({token:Token, UserName:database.clientName})
})
}else{
    console.log(err)
    console.log("no login");
    res.status(403).json({message:"sorry you connot login"})
}
})
}else{
res.status(403).json({message:"something wrong you connont login"})
}
}).catch((er)=>{
    console.log(er)
    res.status(403).send('Oh something wrong')
})
}