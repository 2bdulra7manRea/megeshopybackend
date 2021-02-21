var router=require('express').Router();
var controllers=require('../controllers/controllersUser')




router.post('/register',controllers.User_Register )
router.post('/login', controllers.User_LOGIN)
module.exports=router