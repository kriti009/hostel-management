var mongoose = require("mongoose"),
    autoIncrement = require('mongoose-auto-increment');


var hostelSchema = new mongoose.Schema({
    name: String,
    hostelId : Number,
    imageUrl: String,
    floors : [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Floor"
        }
    ]
});
hostelSchema.plugin(autoIncrement.plugin, { model: 'Hostel', field: 'hostelId' });


var Hostel = mongoose.model("Hostel", hostelSchema);
module.exports = Hostel;