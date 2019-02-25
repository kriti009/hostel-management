var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var hostelSchema = new mongoose.Schema({
    [
        floor1: {}
    ]
});
hostelSchema.plugin(passportLocalMongoose);

var Hostel = mongoose.model("Room", roomSchema);
module.exports = Room;