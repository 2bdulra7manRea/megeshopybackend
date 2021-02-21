var express=require('express');
var app = express();
var RouterAuthUser=require('./routes/AuthUserRouter')
var mongoose=require('mongoose');
var bodyParser=require('body-parser')
var cors=require('cors');
const adminRouters = require('./routes/AdminRouter');
var storeRouter=require('./routes/StoreProductRouter')
var stripeApi=require('stripe')('sk_test_51IKnrtJBaizbmfgjq8zrbLMAoKJ9A8HI4Rh7P74P5QuiUYoUbwGXCbzaKFJXQ8ZS757ZsACmC2MpBzJhbji8wM2J00efoLTnAm');
require('dotenv').config();
let PORT=process.env.PORT||5000
let url=process.env.DB_MONGO
//connect to db mongo
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to DB ........");
 
  }
);


//connect to server
   app.listen(PORT, () => {
      console.log("Server is running well abdelrahman");
    });







app.use(cors())
app.use(bodyParser.json())

// routing

// admin router
app.use('/admin',adminRouters)


//user router
app.use('/account',RouterAuthUser)



// general routing
app.use('/allproducts',storeRouter)


app.post('/do',(req,res)=>{
console.log(req.body)
res.json({message:' congrats'})

})

app.post('/payment',(req,res)=>{
console.log(req.body)
stripeApi.customers.create({
email:'abdomosa987@gmail.com'
}).then((result)=>{
console.log(result)
stripeApi.invoiceItems.create({
customer:result.id,
amount:4000,
currency:'usd',
description:'this is IPAD'
}).then((dataofitem)=>{

console.log(dataofitem)

stripeApi.invoices.create({
collection_method:'charge_automatically',
customer:dataofitem.customer
}).then((result)=>{

  res.json(result)
}).catch((err)=>{


  res.send(err)
})



}).catch((err)=>{
console.log(err)
  res.json(err)
})



}).catch((err)=>{
console.log(err)
res.send("ERR")
})

})
