const Listing = require("./models/model.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./serverschema.js");
const ExpressError = require("./ExpressError.js");

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Store the original URL to redirect the user back after login
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do that!");
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
  let { id } = req.params;
  const listing = await Listing.findById(id);

  // Handle case where listing is not found
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }

  // Ensure owner exists and then check for ownership
  if (!listing.owner || !listing.owner.equals(res.locals.CUser._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewid } = req.params;
  const review = await Review.findById(reviewid);

  // Handle case where review is not found
  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }

  // Ensure author exists and then check for ownership
  if (!review.author || !review.author.equals(res.locals.CUser._id)) {
    req.flash("error", "You are not the author of this review.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(errmsg, 400); // Changed status code to 400 for bad request
  } else {
    next();
  }
};

module.exports.validateReviews = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(errmsg, 400); // Changed status code to 400 for bad request
  } else {
    next();
  }
};