var mongoose = require("mongoose");

var userInfoSchema = new mongoose.Schema({
   name : String,
   email: String,
   roll: String,
   mobile: String,
   branch: String,
   sem : String,
   gender: String
});

var UserInfo = mongoose.model("UserInfo", userInfoSchema);
module.exports = UserInfo;