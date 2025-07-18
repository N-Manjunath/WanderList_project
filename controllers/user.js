const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.Signup = async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    let newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        console.log("The error is:", err);
        return next(err);
      }
      req.flash("success", "Welcome to Wonder");
      res.redirect("/listings");
    });
  } catch (err) {
    console.log("The error is:", err.message);
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.Login = async (req, res) => {
  req.flash("success", "You are logged in!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.Logout = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You aren't logged in");
    return res.redirect("/login");
  }

  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out");
    res.redirect("/listings");
  });
};
