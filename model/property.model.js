const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var facilitySchema = new Schema({

    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: false
    },
    phonenumber1: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Facility', facilitySchema);
