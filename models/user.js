var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
   username: String,
   password: String,
   name : String,
   email: String,
   roll: String,
   mobile: String,
   branch: String,
   sem : String,
   gender: String
});
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);
module.exports = User;