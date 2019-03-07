var mongoose = require("mongoose"),
    autoIncrement = require('mongoose-auto-increment');

var roomSchema = new mongoose.Schema({
   no_person : Number, //no. of beds booked
   max_person: Number,
   roomId : Number, //room id || no.
   owner: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        }
    ]
});
roomSchema.plugin(autoIncrement.plugin, { model: 'Room', field: 'roomId' });
var Room = mongoose.model("Room", roomSchema);
module.exports = Room;