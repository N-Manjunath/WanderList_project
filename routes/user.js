const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError.js");
const {saveUrl}=require("../middleware.js");
const userController=require("../controllers/user.js");

router
    .route("/signup")
    .get(userController.renderSignup)
    .post(wrapAsync(userController.Signup));

router
    .route("/login")
    .get(userController.renderLogin)
    .post(saveUrl,passport.authenticate('local',{failureRedirect:"/login",failureFlash:true}),userController.Login);

router.get("/logout",userController.Logout);
module.exports=router;