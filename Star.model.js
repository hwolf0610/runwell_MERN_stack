const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let runwellStar = new Schema({
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    manageremail:{
        type:String
    },
    rating:{
        type:Number
    },
    username:{
        type:String
    }
});
module.exports = mongoose.model('runwellStar', runwellStar);