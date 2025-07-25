if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Load .env for this specific server if needed
}

const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo"); 

const atlas_url = process.env.ATLAS_DB; // Ensure this is available if using MongoStore
const store = MongoStore.create({
  mongoUrl: atlas_url,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", err => console.log("Session store error:", err));


app.use(
  session({
    store: store, // Use the created MongoStore
    secret: process.env.SECRET, // Load from .env
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set secure based on environment
    },
  })
);


app.get("/session", (req, res) => {
    let { name = "manjunath" } = req.query;
    req.session.name = name;
    console.log(`Setting session name to: ${req.session.name}`);
    res.redirect("/ses");
});

app.get("/ses", (req, res) => {
    const sessionName = req.session.name;
    console.log(`Retrieving session name: ${sessionName}`);
    if (sessionName) {
        res.send(`Hello from session: ${sessionName}`);
    } else {
        res.send("Session name not found. Try accessing /session first.");
    }
});

app.listen(3000, () => {
    console.log('The test server is connected on port 3000');
});