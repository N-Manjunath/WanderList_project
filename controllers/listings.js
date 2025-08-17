
const Listing = require("../models/model.js");

// INDEX
module.exports.index = async (req, res) => {
  const { search, sort, countries } = req.query;
  let query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  if (countries) {
    const countryArray = Array.isArray(countries) ? countries : [countries];
    if (countryArray.includes("Other")) {
      query.country = { $ne: "India" };
    } else {
      query.country = { $in: countryArray };
    }
  }

  let allListingsQuery = Listing.find(query);

  if (sort === "priceLowHigh") {
    allListingsQuery = allListingsQuery.sort({ price: 1 });
  } else if (sort === "priceHighLow") {
    allListingsQuery = allListingsQuery.sort({ price: -1 });
  }

  const allListings = await allListingsQuery.exec();
  return res.render("./lists/index.ejs", { allListings, search });
};

// NEW
module.exports.NewListing = (req, res) => {
  res.render("./lists/new.ejs");
};

// CREATE
module.exports.CreateListing = async (req, res) => {
  const listing = new Listing(req.body.listing);

  // ✅ attach logged-in user
  listing.owner = req.user._id;

  await listing.save();

  req.flash("success", "Successfully created a new listing!");
  res.redirect(`/listings/${listing._id}`);
};
// SHOW
module.exports.ShowListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");  // ✅ owner comes from User model

  if (!listing) {
    req.flash("error", "The listing does not exist");
    return res.redirect("/listings");
  }

  res.render("./lists/show.ejs", { listing });
};



// EDIT
module.exports.EditListings = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  let originalUrl = null;
  if (listing.image && listing.image.url) {
    originalUrl = listing.image.url.replace(
      "/upload",
      "/upload/h_300,w_250,e_blur:300"
    );
  }

  return res.render("./lists/edit.ejs", { listing, originalUrl });
};

// UPDATE
module.exports.UpdateListings = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  const { title, description, price, country, location, category } = req.body.listing;
  listing.title = title;
  listing.description = description;
  listing.price = price;
  listing.country = country;
  listing.location = location;
  listing.category = category;

  // ✅ Only update image if a new one is uploaded
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  // ✅ Ensure owner always exists
  if (!listing.owner) {
    listing.owner = req.user._id;
  }

  await listing.save();
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${listing._id}`);
};


// DELETE
module.exports.DeleteListings = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "The listing is deleted");
  res.redirect("/listings");
};

// FILTER BY CATEGORY
module.exports.filterByCategory = async (req, res) => {
  const { Name } = req.params;
  const allListings = await Listing.find({ category: Name });
  res.render("./lists/index.ejs", { allListings });
};

