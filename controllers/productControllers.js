var Product=require('../models/product')



module.exports.Create_Product=(req,res)=>{
Product.create({
    productName:req.body.productName,
    productDescription:req.body.productDescription,
    price:req.body.price,
    discount:req.body.discount,
    pictures:req.body.pictures,
    category:req.body.category,
    rating:req.body.rating
}).then((data)=>{
res.json(data)
}).catch((err)=>{
console.log(err)
res.json({message:"Wrong"})
})
}
//this is for user
module.exports.Find_ALL_Proudct=(req,res)=>{
Product.find({}).then((allData)=>{
res.json(allData)
}).catch((err)=>{
console.log(err)
res.json({message:'Wrong'})
})    
}


module.exports.Update_product_id=(req,res)=>{
    
Product.updateOne({_id:req.params.id},req.body).then((result)=>{
res.status(200).json(result)
}).catch((err)=>{
console.log(err);
res.status(403).json({message:'Something wrong to update'})
})



}

// this is for user
module.exports.Find_Product_By_Id=(req,res)=>{
Product.findOne({_id:req.params.id}).then((result)=>{
if(result){
res.json(result)
}else{
res.json({message:'we connot find'})
}
}).catch((err)=>{
console.log(err)
res.status(403).json({message:'something wrong to find '})
})
}


module.exports.Delete_Product=(req,res)=>{
Product.deleteOne({_id:req.params.id}).then((result)=>{
res.json(result)
}).catch((err)=>{
console.log(err)
res.status(403).json({message:'something wrong to delete'})
})
}
