// const express=require("express");
// const router=express.Router();
// const Listing = require("../models/model.js");
// const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError=require("../ExpressError.js");
// const {isLoggedin,isOwner,validatelisting}=require("../middleware.js");
// const {listingSchema,reviewSchema}=require("../serverschema.js");
// const ListingController=require("../controllers/listings.js");
// const multer  = require('multer');
// const{storage}=require("../cloudConfig.js");
// const upload = multer({storage});


// router
//   .route("/")
//   .get(wrapAsync(ListingController.index)) // Use the controller method for INDEX 
//   .post(
//     isLoggedin,
//     upload.single("listing[image]"), // Ensure the field name matches your form's input name
//     validatelisting,
//     wrapAsync(ListingController.CreateListings)
//   );


//   router.get("/new",isLoggedin,ListingController.NewListing);

// router.get("/category/:Name", wrapAsync(ListingController.filterByCategory));

// router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(ListingController.EditListings));
// router
//   .route("/:id")
//   .get(wrapAsync(ListingController.ShowListings))
//   .put(
//     isLoggedin,
//     upload.single("listing[image]"), // Ensure the field name matches your form's input name 2
//     isOwner,
//     validatelisting,
//     wrapAsync(ListingController.UpdateListings)
//   )
//   .delete(isLoggedin, isOwner, wrapAsync(ListingController.DeleteListings));



// module.exports=router;




const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validatelisting } = require("../middleware.js");
const ListingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(ListingController.CreateListing)  // ✅ FIXED
  );

router.get("/new", isLoggedin, ListingController.NewListing);

router.get("/category/:Name", wrapAsync(ListingController.filterByCategory));

router.get("/:id/edit", isLoggedin, isOwner, wrapAsync(ListingController.EditListings));

router
  .route("/:id")
  .get(wrapAsync(ListingController.ShowListing))  // ✅ FIXED
  .put(
    isLoggedin,
    upload.single("listing[image]"),
    isOwner,
    validatelisting,
    wrapAsync(ListingController.UpdateListings)
  )
  .delete(isLoggedin, isOwner, wrapAsync(ListingController.DeleteListings));

module.exports = router;
