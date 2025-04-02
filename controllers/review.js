const Listing=require("../models/model.js");
const Review=require("../models/review.js");
module.exports.CreateReview=async(req,res)=>
    {
      let listing=await Listing.findById(req.params.id);
      let newReview=new Review(req.body.review);
      newReview.author=req.user;
      //console.log(req.user);
      listing.reviews.push(newReview);
      await newReview.save();
      await listing.save();
     // console.log("new review saved");
     req.flash("success","New Review added");
      res.redirect(`/listings/${listing._id}`);
  
  
    };

module.exports.DeleteReview=async(req,res)=>
    {
      let{id,reviewid}=req.params;
     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
     await Review.findByIdAndDelete(reviewid);
     req.flash("success","Review Deleted");
     res.redirect(`/listings/${id}`);
    };