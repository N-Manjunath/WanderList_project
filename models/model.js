// // const mongoose=require("mongoose");
// // const Schema=mongoose.Schema;
// // const review = require("./review.js");
// // const user=require("./user.js");
// // const { listingSchema } = require("../serverschema.js");
// // const lists=new Schema({
// // title:
// // {
// //     type:String,
// //     required:true,
// // },
// // description:String,
// // image:{
// //     url:String,
// //     filename:String,
// // }, 
// // price:Number,
// // location:String,
// // country:String,
// // reviews:[
// //     {
// //         type:Schema.Types.ObjectId,
// //         ref:"Review",
// //     }
// // ],
// // owner:
// //     {
// //         type:Schema.Types.ObjectId,
// //         ref:"User",
// //     }
// // });

// // lists.post("findOneAndDelete",async(listing)=>
// // {
// //     if(listings)
// //     {
// //     await review.deleteMany({_id:{$in:listing.reviews}});
// //     }

// // });

// // const listings=mongoose.model("listings",lists);
// // module.exports=listings;



// // const mongoose = require("mongoose");

// // const listingSchema = new mongoose.Schema({
// //   title: String,
// //   description: String,
// //   image: {
// //     url: String,
// //     filename: String
// //   },
// //   price: Number,
// //   location: String,
// //   country: String,
// //   owner: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "User"
// //   }
// // });

// // module.exports = mongoose.model("Listing", listingSchema);





const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Listing", listingSchema);






