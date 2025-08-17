const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
});

// ✅ adds username, hash, salt automatically
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
