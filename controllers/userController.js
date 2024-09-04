const users=require("../model/userSchema")
const sendEmail=require('../middleware/mailer')

//import jwt library
const jwt =require('jsonwebtoken');

//logic for otp sending
exports.sendOtp = async (req, res) => {
   
        const { Email } = req.body; // Accessing 'Email' from req.body
        
        // Log to verify that the Email is extracted correctly
        console.log("Sending OTP to:", Email);
        
     try { if (!Email) {
            return res.status(400).json({ message: "Email is required" });
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const subject = 'Your OTP for Verification';
        const text = `Your OTP is ${otp}`;
        const html = `<p>Your OTP is <strong>${otp}</strong></p>`;
        
        const emailSent = await sendEmail(Email, subject, text, html);
        
        if (emailSent) {
            res.status(200).json({ message: 'OTP sent successfully', otp }); // You might want to remove `otp` in production
        } else {
            console.error("Failed to send email.");
            res.status(500).json({ message: 'Failed to send OTP' });
        }
    } catch (err) {
        console.error('Error in sendOtp:', err);
        res.status(500).json({ message: 'Error sending OTP', error: err.message });
    }
};

//logic for user verification
exports.verify = async (req,res) => {
   
        console.log(req.body); // Log the request body for debugging
        const { Email } = req.body;

    try {const registeredUser = await users.findOne({ mailId: Email });
        console.log(registeredUser);

        if (registeredUser) {
            if (registeredUser.verification == 'false') {
                await users.updateOne(
                    { _id: registeredUser._id },
                    { $set: { verification: true } }
                );
               return res.status(200).json('User verified successfully');
            } else {
               return  res.status(406).json('User already verified');
            }
        } else {
           return res.status(404).json('User not found'); // Use 404 for user not found
        }
    } catch (error) {
        res.status(500).json('Internal Server Error');
        console.error('Error during verification:', error);
    }
};


//logic for user registartion
exports.register = async(req,res)=>{
    console.log(req.body);
    const {username,phone_number,email,dob,password,verification}=req.body

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
        password,
        verification
    })
    //store particulardata in db
    await newUser.save();
    res.status(200).json(newUser);
   }
 }catch(err){
    res.status(401).json('Regisatraion procss faild due to',err);
 }
}

//logic for login

exports.login=async(req,res)=>{
    console.log('inside login function');
    
    const {email,password} =req.body;
    
    try{const existingUser =  await users.findOne({mailId:email,password});

            if(existingUser)
            {
                //token generator - sign('data','secretkey')
              const token=  jwt.sign({userId:existingUser._id},"superSecretkey123");
                res.status(200).json({existingUser,token});
            }
            else{
                res.status(401).json("Incorrect email id or password");
            }
        }
    catch(err){
    res.status(401).json('login request failed due to',err);
    }

}