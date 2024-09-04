//1)import express
const express =require('express');

//import user controller
const userController=require('../controllers/userController');
const { model } = require('mongoose');

//routing is created with the help Routing class present in express module

//2)create an object for routing class
const router =new express.Router();

//3)set path
/* path for register api request */
router.post('/user/register',userController.register)

/* path for resolve login api requesr */
router.post('/user/login',userController.login)

/* path to send otp */
router.post('/user/send-otp',userController.sendOtp)


//path to update account
router.put('/user/updation',userController.verify)

//4)export router
module.exports=router
