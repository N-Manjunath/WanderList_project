const Listing = require("./models/model.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./serverschema.js");
const ExpressError = require("./ExpressError.js");

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
        // Store the original URL only if it's not the login or signup page itself
    // to prevent redirection loops or confusing behavior
    if (req.originalUrl !== '/login' && req.originalUrl !== '/signup') {
        req.session.redirectUrl = req.originalUrl;
    }

    // req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  // let { id } = req.params;
  // const listing = await Listing.findById(id).populate("owner");
  // if (!res.locals.CUser._id.equals(listing.owner.id)) {
  //   req.flash("error", "Permission required");
  //   return res.redirect(`/listings/${id}`);
  // }
  // next();
    let { id } = req.params;
  const listing = await Listing.findById(id).populate("owner");

  // Handle case where listing is not found
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }

  // Ensure owner exists and then check equality
  if (!listing.owner || !res.locals.CUser || !res.locals.CUser._id.equals(listing.owner._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();

};

module.exports.isAuthor = async (req, res, next) => {
  // let { id, reviewid } = req.params;
  // const review = await Review.findById(reviewid);
  // if (!review) {
  //   req.flash("error", "Review not found");
  //   return res.redirect(`/listings/${id}`);
  // }
  // if (!review.author || !res.locals.CUser._id.equals(review.author)) {
  //   req.flash("error", "You are not the author of this review.");
  //   return res.redirect(`/listings/${id}`);
  // }
  // next();

   let { id, reviewid } = req.params;
  const review = await Review.findById(reviewid);

  // Handle case where review is not found
  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }

  // Ensure author exists and then check equality
  if (!review.author || !res.locals.CUser || !res.locals.CUser._id.equals(review.author._id)) {
    req.flash("error", "You are not the author of this review.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(errmsg, 900);
  } else {
    next();
  }
};

module.exports.validateReviews = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(errmsg, 900);
  } else {
    next();
  }
};




