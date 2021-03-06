const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var imgSchema = new Schema({
    category: String,
    description: String,
    mimetype: String,
    url: String
});

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
    },
    images: [imgSchema]
});

module.exports = mongoose.model('Facility', facilitySchema);
