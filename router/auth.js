const express =require('express');
const router= express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticate=require("../middleware/authenticate"); 

require('../database/connection');
const myColllection= require("../modul/userSchema");


router.get('/',(req,res)=>{
    res.send(`hellow world from the server router`);
});
//promicess.......

// router.post('/register',(req,res)=>{
// // console.log(req.body);
// // // res.send("mera register page")
// // res.json({message:req.body});
// const{name,email,phone,work,password,cpassword}=req.body;
// // console.log(name);
// if(!name || !email || !phone || !work || !password || !cpassword){
// return res.status(422).json({ 
//     error: "plz fill the all field properly"});
// }



// myColllection.findOne({email:email}).then((userExist)=>{
// if(userExist){
//     return res.status(422).json({ 
//         error: "Email already Exist"});
// } else if (password!=cpassword){
//     return res.status(422).json({ 
//         error: "passwoer are not match"});
// }else{
    
//        const user = new myColllection({name,email,phone,work,password,cpassword});

       
//       user.save().then(()=>{
//         res.status(201).json({message: "user registered successfully"});
//       }).catch((err)=>res.status(500).json({error:"faild to registered"}));
//    }

// }).catch(err =>{console.log(err)});

// });
// //login router

// router.post('/signin',(req,res)=>{
//     const {email,password}=req.body;
//     if (!email|| !password){
//         return res.status(400).json({ 
//             error: "please fill the data"});
//     }

//      myColllection.findOne({email:email}).then((userLogin)=>{
//         console.log(userLogin);

//       if(!userLogin){
//           res.status(400).json({error: "user error"});
//       } else{
//         res.json({message:"user signin sussesfully"});
//       }

//             }).catch(err =>{console.log(err)});


router.post('/register',async(req,res)=>{
    
    const{name,email,phone,work,password,cpassword}=req.body;
    // console.log(name);
    if(!name || !email || !phone || !work || !password || !cpassword){
    return res.status(422).json({ 
        error: "plz fill the all field properly"});
    }
    
    try{
    const userExist = await myColllection.findOne({email:email});
    if(userExist){
        return res.status(422).json({ 
            error: "Email already Exist"});
    }else if (password != cpassword){
        return res.status(422).json({ 
            error: "Email already Exist"});
    } else{
        const user = new myColllection({name,email,phone,work,password,cpassword});
        //   yeha p middle ware use kiaa
           await user.save();
            res.status(201).json({message: "user registered successfully"});
       
    }
           
    }
     catch(err) {
        console.log(err)};
    
    });
    //login router
    
    router.post('/signin',async(req,res)=>{
        try{
        const {email,password}=req.body;
        if (!email|| !password){
            return res.status(400).json({ 
                error: "please fill the data"});
        }
   
        const userLogin = await myColllection.findOne({email:email});
            // console.log(userLogin);
if(userLogin){ 
    const isMatch = await bcrypt.compare(password,userLogin.password);
    const token = await userLogin.generateAuthToken();
    console.log(token)
 res.cookie("jwtoken",token,{
     expires:new Date(Date.now() + 25892000000), //25892000000  milisecond in 1 month
     httpOnly:true
 });


    if(!isMatch){
        res.status(400).json({error: "pass error"});
    } else{
      res.json({message:"user signin sussesfully"});
    } 
     
}else{
    res.status(400).json({error: "user error"});
}
         
        }catch(err) {console.log(err)};

});

// about us ka page:



router.get('/about',authenticate,(req,res)=>{
    console.log(`hellow about from the server`)
    res.send(req.rootUser); 
});


module.exports=router;