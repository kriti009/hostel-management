var mongoose = require("mongoose"),
    autoIncrement = require('mongoose-auto-increment');

var floorSchema = new mongoose.Schema({
    name : String,
    floorId: Number,
    rooms : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        }
    ]
});
floorSchema.plugin(autoIncrement.plugin, { model: 'Floor', field: 'floorId' });
// floorSchema.plugin(autoIncrement.plugin, 'Floor');

var Floor = mongoose.model("Floor", floorSchema);
module.exports = Floor;