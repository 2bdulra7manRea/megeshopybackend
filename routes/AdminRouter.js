const { Admin_register, Admin_login, Admin_Get_All_Users } = require('../controllers/adminController');

const { Create_Product, Find_ALL_Proudct, Update_product_id, Find_Product_By_Id, Delete_Product } = require('../controllers/productControllers');
const { Checking_token } = require('../controllers/usermiddle');

var  adminRouters=require('express').Router();

adminRouters.post('/register',Admin_register)
adminRouters.post('/login',Admin_login)


adminRouters.post('/products/create',  Checking_token,Create_Product)//true
adminRouters.get('/users',             Checking_token, Admin_Get_All_Users )
adminRouters.get('/products/list',      Checking_token,Find_ALL_Proudct)//true
adminRouters.get('/product/:id',       Checking_token,Find_Product_By_Id)//true
adminRouters.patch('/product/edit/:id',Checking_token, Update_product_id)
adminRouters.delete('/product/delete/:id', Checking_token,Delete_Product)//true






module.exports=adminRouters