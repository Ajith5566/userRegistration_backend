const users=require("../model/userSchema")

//logic for user registartion
exports.register = async(req,res)=>{
    console.log(req.body);
    const {username,phone_number,email,dob,password}=req.body

   try{const existingUser=  await users.findOne({mailId:email});

   if(existingUser){
    res.status(406).json('user already exist')
   }
   else{
    const newUser=new users({
        username,
        phoneNumber:phone_number,
        mailId:email,
        dob,
        password
    })
    //store particulardata in db
    await newUser.save();
    res.status(200).json(newUser);
   }
 }catch(err){
    res.status(401).json('Regisatraion procss faild due to',err);
 }
}