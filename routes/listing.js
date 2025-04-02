const express=require("express");
const router=express.Router();
const Listing = require("../models/model.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {isLoggedin,isOwner,validatelisting}=require("../middleware.js");
const {listingSchema,reviewSchema}=require("../serverschema.js");
const ListingController=require("../controllers/listings.js");
const multer  = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({storage});

// router.route --- combine same path with different requests

router
  .route("/",Listing.ListingController.index)
  .get(wrapAsync(ListingController.index))
  .post(isLoggedin,upload.single("listing[image]"),validatelisting,wrapAsync(ListingController.CreateListings));

  

  router.get("/new",isLoggedin,ListingController.NewListing);
router
  .route("/:id")
  .get(wrapAsync(ListingController.ShowListings))
  .delete(isLoggedin,isOwner,wrapAsync(ListingController.DeleteListings))
  .put(isLoggedin,upload.single("listing[image]"),isOwner,validatelisting,wrapAsync(ListingController.UpdateListings));

router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(ListingController.EditListings));
module.exports=router;


