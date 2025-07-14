const express=require("express");
const app=express();
const session=require("express-session");


// app.use(session(
//     {
//         require("dotenv").config();
// secret: process.env.SECRET,
//         resave:false,
//         saveUninitialized:true,
//         cookie:{
//             expires:new Date(Date.now()+360000),
//             httpOnly:true,
//             secure:false,
//         },
//     }
// ))
// ✅ Load env variables ONCE at the top
require("dotenv").config();

const session = require("express-session"); // make sure you required express-session

// ✅ Correct use of session middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
      secure: false,
    },
  })
);


app.get("/session",(req,res)=>
{
    let{name="manjunath"}=req.query;
    req.session.name=name;
    console.log(req.session.name);
    res.redirect("/ses");
})
app.get("/ses",(req,res)=>
{
    console.log(req.session.name);
    res.send(`${req.session.name}`);
})
app.listen(3000,()=>
{
    console.log('the server is connected');
})