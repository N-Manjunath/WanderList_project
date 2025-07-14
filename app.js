// // if(process.env.NODE_ENV!="production")
// // {
// // require("dotenv").config();
// // }
// // //console.log(process.env) 
// // const ExpressError=require("./ExpressError");
// // const express = require("express");
// // const app = express();
// // const path=require("path");
// // const methodOverride = require("method-override");
// // const mongoose = require("mongoose");
// // const engine=require('ejs-mate');
// // const session=require("express-session");
// // const MongoStore = require('connect-mongo');
// // const flash=require("connect-flash");
// // const passport=require("passport");
// // const LocalStrategy=require("passport-local");

// // const User = require("./models/user.js");

// // const atlas_url=process.env.ATLAS_DB;
// // // async function main() {
// // //   await mongoose.connect(atlas_url);
// // // }
// // mongoose.connect(atlas_url, {
// //   //serverSelectionTimeoutMS: 30000,  // ⏳ Increase timeout to 30 seconds
// // }).then(() => {
// //   console.log("✅ Connected to MongoDB Atlas");
// // }).catch(err => {
// //   console.error("❌ MongoDB connection error:", err);
// // });





// // app.set("view engine", "ejs");
// // app.engine("ejs",engine);
// // app.set("views", path.join(__dirname, "views"));

// // app.use(express.urlencoded({ extended: true }));
// // app.use(methodOverride("_method"));
// // app.use(express.static(path.join(__dirname,"public")));
// // // const MONGO_URL = "mongodb://127.0.0.1:27017/wonder";



// // mongoose.connection.once("open", () => {
// //   console.log("✅ MongoDB Connection Ready!");
// // });
// // mongoose.connection.on("error", (err) => {
// //   console.error("❌ MongoDB Connection Error:", err);
// // });



// // const store=MongoStore.create({
// //   mongoUrl:atlas_url,
// //   crypto:{
// //     secret:process.env.SECRET,
// //   },
// //   touchAfter:24*3600,
// // });
// // store.on("error",(err)=>
// // {
// //   console.log("error in mongo session store", err);
// // });

// //   const sessionOpt= {
// //     store,
// //     secret:process.env.SECRET,
// //     resave:false,
// //     saveUninitialized:true,
// //     cookie:{
// // expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
// //         httpOnly:true,
// //         secure:false,
// //     },
// //   }

// // app.use(session(sessionOpt));
// // app.use(flash());

// // app.use(passport.initialize());
// // app.use(passport.session());
// // passport.use(new LocalStrategy(User.authenticate()));
// // passport.serializeUser(User.serializeUser());
// // passport.deserializeUser(User.deserializeUser());

// // app.use((req,res,next)=>
// //   {
// //     console.log("the user is ",req.user);
// //     res.locals.success=req.flash("success");
// //     res.locals.error=req.flash("error");
// //     res.locals.CUser=req.user || null;
// //     next();
// //   });


// //   app.get("/",(req,res)=>
// //   {
// //     res.render("./lists/home.ejs");
// //   })
// // const listingRouter=require("./routes/listing.js");
// // const reviewRouter=require("./routes/review.js")
// // const userRouter=require("./routes/user.js")


// // app.use("/listings",listingRouter);
// // app.use("/listings/:id/reviews",reviewRouter);
// // app.use("/",userRouter);




// // // const ExpressError=require("./ExpressError");
// // // app.get('/err',(req,res)=>
// // //   {
// // //     abd=history;
// // //   })
// //  app.all("*",(req,res,next)=>
// //  {
// //     next(new ExpressError("page not found",404));
// //  });

// // //default error
// // app.use((err,req,res,next)=>
// //   {
// //     // let statusCode=err.statusCode || 500;
// //     // let message=err.message || "something went wrong!!";
// //     let{statusCode=404,message="something went wrong"}=err;
// // res.render("./lists/error.ejs",{message});

// //   });

// //   app.listen(8080, () => {
// //     console.log("server is listening to port 8080");
  
// //   });

 

    

  
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// const express = require("express");
// const app = express();
// const path = require("path");
// const methodOverride = require("method-override");
// const mongoose = require("mongoose");
// const engine = require("ejs-mate");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");

// const User = require("./models/user.js");

// const atlas_url = process.env.ATLAS_DB;

// mongoose.connect(atlas_url)
//   .then(() => {
//     console.log("✅ Connected to MongoDB Atlas");
//   })
//   .catch(err => {
//     console.error("❌ MongoDB connection error:", err);
//   });

// app.set("view engine", "ejs");
// app.engine("ejs", engine);
// app.set("views", path.join(__dirname, "views"));

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "public")));

// const store = MongoStore.create({
//   mongoUrl: atlas_url,
//   crypto: {
//     secret: process.env.SECRET,
//   },
//   touchAfter: 24 * 3600,
// });

// store.on("error", err => {
//   console.log("Error in Mongo session store:", err);
// });

// const sessionOpt = {
//   store,
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
//     httpOnly: true,
//     secure: false,
//   },
// };

// app.use(session(sessionOpt));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // ✅ ✅ ✅ Make the user available in ALL views & middlewares
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.CUser = req.user || null; // ✅ THIS IS CRUCIAL!
//   console.log("the user is", req.user);
//   next();
// });

// app.get("/", (req, res) => {
//   res.render("./lists/home.ejs");
// });

// const listingRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");

// app.use("/listings", listingRouter);
// app.use("/listings/:id/reviews", reviewRouter);
// app.use("/", userRouter);

// const ExpressError = require("./utils/ExpressError.js");

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page not found", 404));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Something went wrong" } = err;
//   res.render("./lists/error.ejs", { message });
// });

// app.listen(8080, () => {
//   console.log("Server is listening on port 8080");
// });












// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// const express = require("express");
// const app = express();
// const path = require("path");
// const methodOverride = require("method-override");
// const mongoose = require("mongoose");
// const engine = require("ejs-mate");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const ExpressError = require("./ExpressError");
// const User = require("./models/user.js");

// const atlas_url = process.env.ATLAS_DB;

// mongoose.connect(atlas_url)
//   .then(() => console.log("✅ Connected to MongoDB Atlas"))
//   .catch(err => console.error("❌ MongoDB connection error:", err));

// app.set("view engine", "ejs");
// app.engine("ejs", engine);
// app.set("views", path.join(__dirname, "views"));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride("_method"));
// app.use(express.static(path.join(__dirname, "public")));

// const store = MongoStore.create({
//   mongoUrl: atlas_url,
//   crypto: {
//     secret: process.env.SECRET,
//   },
//   touchAfter: 24 * 3600,
// });
// store.on("error", err => console.log("Session store error:", err));

// const sessionConfig = {
//   store,
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
//     httpOnly: true,
//     secure: false,
//   },
// };

// app.use(session(sessionConfig));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.CUser = req.user || null;
//   next();
// });

// const listingRouter = require("./routes/listing");
// app.use("/listings", listingRouter);

// app.get("/", (req, res) => {
//   res.render("lists/home.ejs");
// });

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page not found", 404));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Something went wrong" } = err;
//   res.status(statusCode).render("lists/error.ejs", { message });
// });

// app.listen(8080, () => {
//   console.log("Server is listening on port 8080");
// });















// ✅ app.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./ExpressError");
const User = require("./models/user.js");

const atlas_url = process.env.ATLAS_DB;

mongoose.connect(atlas_url)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.set("view engine", "ejs");
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl: atlas_url,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", err => console.log("Session store error:", err));

const sessionConfig = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: false,
  },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.CUser = req.user || null;
  next();
});

const listingRouter = require("./routes/listing");
app.use("/listings", listingRouter);

app.get("/", (req, res) => {
  res.render("lists/home.ejs");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("lists/error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});