const { Sort_by, Get_Category, Department_Items, Search_By } = require('../controllers/GeneralProductsControllers');
const { Find_ALL_Proudct } = require('../controllers/productControllers');

var storeRouter=require('express').Router();


storeRouter.get('/',Find_ALL_Proudct)
storeRouter.get('/sort',Sort_by) //sort by price or rating 
storeRouter.get('/category',Get_Category) // get category 
storeRouter.get('/category/:id',Department_Items) // get items of categry
storeRouter.get('/search',Search_By)






module.exports=storeRouter;


