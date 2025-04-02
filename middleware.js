const Listing=require("./models/model.js");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const Review=require("./models/review.js");
const {listingSchema,reviewSchema}=require("./serverschema.js");
module.exports.isLoggedin=(req,res,next)=>
{
    //console.log(req.path,"...",req.originalUrl);
    if(!req.isAuthenticated())
    {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveUrl=(req,res,next)=>
{
    if(req.session.redirectUrl)
    {
    res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>
{
    let {id}=req.params;
   // console.log(res.locals.CUser._id);
    const listing = await Listing.findById(id).populate("owner");
   // console.log(listing.owner._id);
    //console.log(listing.owner);
    if(!res.locals.CUser._id.equals(listing.owner.id))
    {
        req.flash("error","permission required");
       return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor=async (req,res,next)=>
  {
      let {id,reviewid}=req.params;
      //console.log(res.locals.CUser.id);
      //console.log(reviewid);
      const review= await Review.findById(reviewid);
      if(!review)
      {
        req.flash("error","review not found");
        return res.redirect(`/listings/${id}`);
      }
      //console.log(review.author._id);
    // console.log(review.author);
    if (!review.author || !res.locals.CUser._id.equals(review.author)) {
      req.flash("error", "You are not the author of this review.");
      return res.redirect(`/listings/${id}`);
  }
      next();
  }

module.exports.validatelisting=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error)
    {
      let errmsg=error.details.map(el=>el.message).join("\n");
      //console.log(error.details);
      //console.log(errmsg);
      throw new ExpressError(errmsg,900);
    }
    else{
      next();
    }
}

module.exports.validateReviews=(req,res,next)=>{
    let{error}=reviewSchema.validate(req.body);
    if(error)
    {
      let errmsg=error.details.map(el=>el.message).join("\n");
     // console.log(error.details);
      //console.log(errmsg);
      throw new ExpressError(errmsg,900);
    }
    else{
      next();
    }
  }