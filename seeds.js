var mongoose = require("mongoose");
var Hostel = require("./models/hostel"),
    Floor = require("./models/floor"),
    Room = require("./models/room");
    
var hostel = [{
    name: "Boriwali",
},{
    name: "Worli"
},{
    name: "Wadala"
}];

var floor = [{
    name: "floor1"
},{
    name: "floor2"
},{
    name: "floor3"
}];

var room = [{
    max_person: 1,
    no_person: 0
},{
    max_person: 2,
    no_person: 0
},{
    max_person: 3,
    no_person: 0
}];
var trail = {max_person: 1,
    no_person: 0};
var i = 0;
var j;
function creat(){
    Hostel.create(hostel,function(err, hostel){
        if(err){
            console.log(err);
        }
        console.log(hostel);
        Floor.create(floor, function(err, floor){
            if(err){
                console.log(err);
            }
            console.log(floor);
            Room.create(room,function(err, room){
                if(err){
                    console.log(err);
                }
                console.log(room);
            });
        });
    });
    
    

}
function seedDB(){
    // Hostel.create(hostel,function(err, hostel){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log(hostel);
    //     Floor.create(floor, function(err, floor){
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log(floor);
    //         Room.create(room,function(err, room){
    //             if(err){
    //                 console.log(err);
    //             }
    //             console.log(room);
    //         });
    //     });
    // });
    Room.find({}, function(err, rooms){
        console.log(rooms);
        Floor.find({},function(err,floors){
            console.log(floors);
            for(i=0; i<3; i++){
                // console.log(floors[i].rooms.push(trail));
                for(z=0;z<3;z++)
                    floors[i].rooms.push(rooms[z]);
                floors[i].save();
            };
            Hostel.find({}, function(err, hostels){
                for(j=0; j<3; j++){
                    for(z=0; z<3; z++){
                        hostels[j].floors.push(floors[z]);
                    }
                    // hostels[j].floors.push(floors[i]);
                    hostels[j].save();
                }
            });    
        });
    
    });
}

module.exports = seedDB;