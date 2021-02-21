var express=require('express');
var app = express();
var RouterAuthUser=require('./routes/AuthUserRouter')
var mongoose=require('mongoose');
var bodyParser=require('body-parser')
var cors=require('cors');
const adminRouters = require('./routes/AdminRouter');
var storeRouter=require('./routes/StoreProductRouter')
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
