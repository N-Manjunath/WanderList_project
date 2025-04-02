const mongoose=require("mongoose");
const itdata=require("./data.js");
const Listing=require("../models/model.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wonder";


main().then(()=>
{
    console.log("connected to DB");
}).catch((err)=>
{
    console.log(err);
});
async function main()
{
    await mongoose.connect(MONGO_URL);
}

const strt=async()=>
{
await Listing.deleteMany({});
    itdata.data=itdata.data.map((obj)=>({
        ...obj,
        owner:"67dbecb8f83a8b1689d02162",
    }));
    await Listing.insertMany(itdata.data,{ordered:false});
    console.log("the data was being inserted");
}

strt();