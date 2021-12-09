const express = require('express');
const dotenv = require("dotenv");


dotenv.config({path:'./config.env'});
require('./database/connection');
// const user=require('./model/userSchema')
const app = express();
app.use(express.json());

app.use(require('./router/auth'));  //we link the router file 
// to make our route easy

const PORT=process.env.PORT;



// Middleware

// const middleware =(req,res,next)=>{
//     console.log(`Hellow Middleware`);
//     next()
// }

// app.get('/',(req,res)=>{
//     res.send(`hellow world from the server`);
// });
// app.get('/about',middleware,(req,res)=>{
//     res.send(`hellow about from the server`);
// });

// app.get('/signup',(req,res)=>{
//     res.send(`hellow signup from the server`);
// });

app.listen(PORT,()=>{
    console.log(`welcome to server subscribe ${PORT}`)
})