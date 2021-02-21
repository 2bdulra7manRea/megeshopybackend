var adminTable=require('../models/databaseAdmin')
var User=require('../models/databaseUser')
var bcrypt=require('bcrypt')
var token=require('jsonwebtoken')

module.exports.Admin_register=async (req,res)=>{
  console.log(req.body)
let salt=await bcrypt.genSalt()
let hash=await bcrypt.hash(req.body.password,salt)
adminTable.create({
AdminName:req.body.AdminName,
password:hash,
email:req.body.email
}).then((database)=>{
token.sign({id:database._id},process.env.SECRET,(err,token)=>{
if(err){
console.log(err)
res.status(403).json({message:"something wrong"})
}else{
res.json({token:token , name:database.AdminName})
}
})
}).catch((err)=>{
console.log(err);
res.status(403).json({message:'something wrong'})
})
}



module.exports.Admin_login = (req, res) => {
  adminTable.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      bcrypt.compare(req.body.password, result.password, (err, eng) => {
        if (eng) {
          token.sign(
            { id: result._id },
            process.env.SECRET,
            (err, Webtoken) => {
              if (err) {
                res.status(403).json({ message: "no login" });
              } else {
                res.json({ token: Webtoken ,name: result.AdminName});
              }
            }
          );
        } else {
          res.status(403).json({ message: "not authorized" });
        }
      });
    } else {
      res.status(403).json({ message: "no login" });
    }
  });
};



module.exports.Admin_Get_All_Users=(req,res)=>{
User.find({}).then((users)=>{
res.status(202).json(users)
}).catch((err)=>{
console.log(err)
res.status(403).json({message:'Something wrong to get data from server'})
})
}

