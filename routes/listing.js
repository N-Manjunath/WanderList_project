// const express=require("express");
// const router=express.Router();
// const Listing = require("../models/model.js");
// const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError=require("../utils/ExpressError.js");
// const {isLoggedin,isOwner,validatelisting}=require("../middleware.js");
// const {listingSchema,reviewSchema}=require("../serverschema.js");
// const ListingController=require("../controllers/listings.js");
// const multer  = require('multer');
// const{storage}=require("../cloudConfig.js");
// const upload = multer({storage});

// // router.route --- combine same path with different requests

// router
//   .route("/")
//   .get(wrapAsync(ListingController.index))
//   .post(isLoggedin,upload.single("listing[image]"),validatelisting,wrapAsync(ListingController.CreateListings));

  

//   router.get("/new",isLoggedin,ListingController.NewListing);
// router
//   .route("/:id")
//   .get(wrapAsync(ListingController.ShowListings))
//   .delete(isLoggedin,isOwner,wrapAsync(ListingController.DeleteListings))
//   .put(isLoggedin,upload.single("listing[image]"),isOwner,validatelisting,wrapAsync(ListingController.UpdateListings));

// router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(ListingController.EditListings));
// module.exports=router;






// const express = require("express");
// const router = express.Router();
// const Listing = require("../models/model");
// const { validatelisting } = require("../middleware");
// const wrapAsync = require("../utils/wrapAsync"); // create this if needed

// // Route to show form (GET)
// router.get("/new", (req, res) => {
//   res.render("lists/new.ejs"); // You must create this EJS file
// });

// // Route to insert new listing (POST)
// router.post("/", validatelisting, wrapAsync(async (req, res) => {
//   const listing = new Listing(req.body.listing);
//   await listing.save();
//   req.flash("success", "New listing added!");
//   res.redirect(`/listings/${listing._id}`);
// }));

// // Route to show the listing (GET)
// router.get("/:id", wrapAsync(async (req, res) => {
//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//     req.flash("error", "Listing not found.");
//     return res.redirect("/listings");
//   }
//   res.render("lists/show.ejs", { listing });
// }));

// module.exports = router;



// ✅ routes/listing.js
const express = require("express");
const router = express.Router();
const Listing = require("../models/model");
const { validatelisting, isLoggedin, isOwner } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

router.get("/new", isLoggedin, (req, res) => {
  res.render("lists/new.ejs");
});

router.post("/", isLoggedin, validatelisting, wrapAsync(async (req, res) => {
  const listing = new Listing(req.body.listing);
  listing.owner = req.user._id;
  await listing.save();
  req.flash("success", "New listing added!");
  res.redirect(`/listings/${listing._id}`);
}));

router.get("/:id", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }
  res.render("lists/show.ejs", { listing });
}));

module.exports = router;