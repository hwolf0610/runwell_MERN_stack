const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let runwellCustomer = new Schema({
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    managername:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    DOB:{
        type:String
    },
    SSN:{
        type:String
    },
    gender:{
        type:String
    },
    RACE:{
        type:String
    },
    AdmitDate:{
        type:String
    },
    houseID:{
        type:String
    }
});
module.exports = mongoose.model('runwellCustomer', runwellCustomer);