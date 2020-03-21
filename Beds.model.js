const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let runwellBeds = new Schema({
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    managername:{
        type:String
    },
    manageremail:{
        type:String
    },
    managerphoneNumber:{
        type:String
    },
    stars:{
        type:String
    },
    bedcount:{
        type:String
    },
    realcount:{
        type:String
    },
    freecount:{
        type:String
    },
    description:{
        type:String
    },
    mainimage:{
        type:String
    },
    bedimage1:{
        type:String
    },
    bedimage2:{
        type:String
    }
});
module.exports = mongoose.model('runwellBeds', runwellBeds);