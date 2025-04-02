const Listing=require("../models/model.js");
const ExpressError=require("../utils/ExpressError.js");
module.exports.index=async (req, res) => {
    const allListings = await Listing.find().limit(10);
    console.log("error detected",allListings);
    res.render("./lists/index.ejs", { allListings });
  };
  module.exports.CreateListings=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
  };
module.exports.NewListing=(req, res) => {
     
    res.render("./lists/new.ejs");
};

module.exports.ShowListings=async (req, res,next) => {


    let { id } = req.params;

   const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
   if(!listing)
   {
    req.flash("error","the listing does not exists");
    //console.log("the listing does not exists");
    res.redirect("/listings");
   }
//console.log(listing);
    res.render("./lists/show.ejs", { listing });
}; 

module.exports.EditListings=async (req, res,next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    // if(!listing)
    // {
    //   req.flash("error","the listing does not exists");
    //   res.redirect("/listings");
    // }
    // res.render("./lists/edit.ejs", { listing });
    let originalUrl=listing.image.url;
  //  console.log(originalUrl);
    originalUrl=originalUrl.replace("/upload","/upload/h_300,w_250,e_blur:300");
    return res.render("./lists/edit.ejs", { listing,originalUrl });
  };

module.exports.UpdateListings=async (req, res) => {
    let { id } = req.params;
    const newListing=await Listing.findByIdAndUpdate(id, { ...req.body.listing },{new:true});
    if(req.file)
    {
    let url=req.file.path;
   // console.log(url);
    let filename=req.file.filename;
   // console.log(filename);
    newListing.image={url,filename};
   // console.log(newListing.image);
    await newListing.save();
    }
    req.flash("success","The listing updated ");
    res.redirect("/listings");
  };

module.exports.DeleteListings=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    //console.log(deletedListing);
    req.flash("success","The listing is deleted");
    res.redirect("/listings");
  };

