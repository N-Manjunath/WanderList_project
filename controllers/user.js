const User=require("../models/user.js");
module.exports.renderSignup=(req,res)=>
    {
        res.render("./users/signup.ejs");
    };

module.exports.Signup=async(req,res,next)=>
        {
            try{
                let {email,username,password}=req.body;
                let newUser=new User({email,username});
                //console.log(newUser);
                const registeredUser=await User.register(newUser,password);
               // console.log("user registered ",registeredUser);
                req.login(registeredUser,(err)=>
                {
                    if(err)
                    {
                        console.log("the error is",err);
                       return next(err);
                    }
                    req.flash("success","welcome to wonder");           
                     res.redirect("/listings");
                });

        
            }
            catch(err)
            {
                console.log("the error is ",err.message);
                req.flash("error",err.message);
                res.redirect("/signup");
            }
        };

module.exports.renderLogin=(req,res)=>
    {
        res.render("./users/login.ejs");
    }
module.exports.Login=async(req,res)=>
    {
          console.log("✅ the user is", req.user); // Should always show user now!
        req.flash("success","you are logged in!");
       // let redirectUrl=res.locals.redirectUrl || "/listings";
         const redirectUrl = req.session.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);
    };

module.exports.Logout=async (req,res,next)=>
    {
        if(!req.isAuthenticated())
        {
        req.flash("error","you arent  logged in");
        return res.redirect("/login");
        }
        try {
            await req.logout();  // ✅ Fixed for Passport v0.6+
            req.flash("success", "You are logged out");
            res.redirect("/listings");
        } catch (err) {
            console.log(err);
            return next(err);
        }
    };