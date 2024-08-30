//schema for users collection in database


//1)import mongoose

const mongoose =require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        reqire:true
    },
    mailId:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

//model
const users=mongoose.model("users",userSchema)

//export model
module.exports=users