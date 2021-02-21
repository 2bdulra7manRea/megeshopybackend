var items=require('../models/product')





// sort by rating by price,
// search by products /catogory, 
// filter by rating /by price
// get category



module.exports.Sort_by=async (req,res)=>{
let x =await parseInt( req.headers.order)
let modifier=await req.headers.modifier || price   
console.log(typeof x)    
items.aggregate([
{$sort:{[modifier]:x}},
{$project:{price:1 , rating:1}}
]).then((result)=>{
res.json(result)
}).catch((err)=>{
res.json(err)
})
}

















module.exports.Get_Category=(req,res)=>{
    
items.aggregate([
{$group:{_id:"$category"}}
]).then((result)=>{
res.json(result)
})
}


module.exports.Department_Items=(req,res)=>{
    
    console.log(req.params)
items.find({category:req.params.id}).then((results)=>{
res.json(results)
}).catch((err)=>{
console.log(err)
res.status(404).json({message:"something wrong in database"})
})

}













module.exports.Search_By=(req,res)=>{
// itesm name / categroy
console.log(req.headers.item)
items.find({
     $or:[{productName:req.headers.item},
            {category:req.headers.item}
        ]
    }).then((result)=>{

        res.json(result)

    }).catch((err)=>{
        console.log(err);
        res.json({message:"wrong !!"})
    })

}


