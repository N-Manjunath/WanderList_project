const express=require("express");
const router=express.Router();
const Listing = require("../models/model.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../ExpressError.js");
const {isLoggedin,isOwner,validatelisting}=require("../middleware.js");
const {listingSchema,reviewSchema}=require("../serverschema.js");
const ListingController=require("../controllers/listings.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({storage});

// router.route --- combine same path with different requests


// INDEX - Show all listings
// router.get("/", wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({}); // Fetch all listings from the database
//     res.render("listings/index.ejs", { allListings }); // Pass them to the EJS template
// }));

// router
//   .route("/")
//   .get(wrapAsync(ListingController.index))
//   .post(isLoggedin,upload.single("listing[image]"),validatelisting,wrapAsync(ListingController.CreateListings));

  // Combined INDEX and CREATE routes for "/" using router.route()
router
  .route("/")
  .get(wrapAsync(ListingController.index)) // Use the controller method for INDEX [cite: 1]
  .post(
    isLoggedin,
    upload.single("listing[image]"), // Ensure the field name matches your form's input name [cite: 1]
    validatelisting,
    wrapAsync(ListingController.CreateListings)
  );


  router.get("/new",isLoggedin,ListingController.NewListing);
// router
//   .route("/:id")
//   .get(wrapAsync(ListingController.ShowListings))
//   .delete(isLoggedin,isOwner,wrapAsync(ListingController.DeleteListings))
//   .put(isLoggedin,upload.single("listing[image]"),isOwner,validatelisting,wrapAsync(ListingController.UpdateListings));
router.get("/category/:Name", wrapAsync(ListingController.filterByCategory));

router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(ListingController.EditListings));
router
  .route("/:id")
  .get(wrapAsync(ListingController.ShowListings))
  .put(
    isLoggedin,
    upload.single("listing[image]"), // Ensure the field name matches your form's input name [cite: 1]
    isOwner,
    validatelisting,
    wrapAsync(ListingController.UpdateListings)
  )
  .delete(isLoggedin, isOwner, wrapAsync(ListingController.DeleteListings));



module.exports=router;








