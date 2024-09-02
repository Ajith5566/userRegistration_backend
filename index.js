//1)imprt dotenv module
require('dotenv').config();
//2)import express
const express =require('express');
//3)import cors
const cors=require('cors');
//import router
const router =require('./Routing/router')

//import application middleware
/* const appmiddleware=require('./middleware/appMiddleware'); */

//import connection file
require('./DB/connection')
//4)create server
const urServer=express()

//5)use cors by server

urServer.use(cors())

//6)convert json to javascript object
urServer.use(express.json())

/* urServer.use(appmiddleware); */

//server using router
urServer.use(router)












//7)set port
const PORT = 3001 || process.env

//8) run server
urServer.listen(PORT,()=>{
    console.log(`urserver running successfully at port number ${PORT}`);
    
})
