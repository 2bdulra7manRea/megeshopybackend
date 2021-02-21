var token=require('jsonwebtoken');


module.exports.Checking_token=(req,res,next)=>{
token.verify(req.headers.token ,process.env.SECRET,(err,decoding)=>{
if(err){
res.status(403).json({message:"you are not authorized"})
console.log(err)
}else{
next()
}
})

}
