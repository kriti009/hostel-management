var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var roomSchema = new mongoose.Schema({
   person: Number,
   Id : Number,
   User1: User,
   User2: User,
   User3: User
});
roomSchema.plugin(passportLocalMongoose);

var Room = mongoose.model("Room", roomSchema);
module.exports = Room;