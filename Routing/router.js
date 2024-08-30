//1)import express
const express =require('express');

//import user controller
const userController=require('../controllers/userController');
const { model } = require('mongoose');

//routing is created with the help Routing class present in express module

//2)create an object for routing class
const router =new express.Router();

//3)set path

router.post('/user/register',userController.register)

//4)export router
module.exports=router
