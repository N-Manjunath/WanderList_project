const Listing=require("../models/model.js");
const ExpressError=require("../ExpressError.js");
//new index route
module.exports.index = async (req, res) => {
  const { search, sort, countries } = req.query;
  let query = {};
 if (search) {
  query.$or = [
    { title: { $regex: search, $options: 'i' } },
    { country: { $regex: search, $options: 'i' } },
    { location: { $regex: search, $options: 'i' } }
  ];
}



  if (countries) {
  const countryArray = Array.isArray(countries) ? countries : [countries];

  if (countryArray.includes("Other")) {
    // If "Other" is selected, show listings that are NOT India
    query.country = { $ne: "India" };
  } else {
    // If specific countries selected, show only those
    query.country = { $in: countryArray };
  }
}
  let allListingsQuery = Listing.find(query);

  // ✅ Apply sorting:
  if (sort === 'priceLowHigh') {
    allListingsQuery = allListingsQuery.sort({ price: 1 });
  } else if (sort === 'priceHighLow') {
    allListingsQuery = allListingsQuery.sort({ price: -1 });
  }

  const allListings = await allListingsQuery.exec();

  return res.render("./lists/index.ejs", { allListings, search });
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
module.exports.filterByCategory = async (req, res) => {
  const { Name } = req.params;
  const allListings = await Listing.find({ category:Name });
  res.render("./lists/index.ejs", {allListings}); // or your listing view
};

module.exports.ShowListings=async (req, res,next) => {


    let { id } = req.params;

   const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
   if(!listing)
   {
    req.flash("error","the listing does not exists");;
    res.redirect("/listings");
   }
    res.render("./lists/show.ejs", { listing });
}; 

module.exports.EditListings=async (req, res,next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    let originalUrl=listing.image.url;
  //  console.log(originalUrl);
    originalUrl=originalUrl.replace("/upload","/upload/h_300,w_250,e_blur:300");
    return res.render("./lists/edit.ejs", { listing,originalUrl });
  };


module.exports.UpdateListings=async (req, res) => {
  
    const { id } = req.params;
  const listing = await Listing.findById(id);

  // Update other fields
  const { title, description, price, country, location, category } = req.body.listing;
  listing.title = title;
  listing.description = description;
  listing.price = price;
  listing.country = country;
  listing.location = location;
  listing.category = category;

  // If a new image is uploaded
  if (req.file) {
    listing.image.url = req.file.path;        // Cloudinary path
    listing.image.filename = req.file.filename;
  } else {
      // Ensure image object exists
  if (!listing.image) {
    listing.image = {};
  }

    // If not, keep the old image

    listing.image.url = req.body.listing.image.url;
    listing.image.filename = req.body.listing.image.filename;
  }

  await listing.save();
  req.flash("success", "Listing updated successfully!");
  res.redirect("/listings");

  };

module.exports.DeleteListings=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    //console.log(deletedListing);
    req.flash("success","The listing is deleted");
    res.redirect("/listings");
  };

