const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let runwellUser = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    flag:{
        type:String
    }
});
module.exports = mongoose.model('runwellUser', runwellUser);