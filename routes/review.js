const express=require("express");
const router=express.Router({mergeParams:true});
const Listing = require("../models/model.js");
const Review=require("../models/review.js");
const {listingSchema,reviewSchema}=require("../serverschema.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../ExpressError.js");

const{validateReviews,isLoggedin,isAuthor}=require("../middleware.js");

const ReviewController=require("../controllers/review.js");
//review validation


//review

router.post("/",isLoggedin,validateReviews,wrapAsync(ReviewController.CreateReview));

   //deletion
  
   router.delete("/:reviewid",isLoggedin,isAuthor,wrapAsync(ReviewController.DeleteReview)) ;  

module.exports=router;