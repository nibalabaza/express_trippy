var mongoose = require('mongoose');

var hotels = new mongoose.Schema({

    hotelname: {type: String,
                index: true},

    address: {type: String,
                index: true},
    
    city: {type: String,
                index: true},

    country: {type: String,
                index: true},  

    stars: {type: Number,
                index: true},

    spa: {type: Boolean,
                index: true},

    pool: {type: Boolean,
                index: true},

    price: {type: Number,
                index: true},         
    
});



var model = mongoose.model('hotels', hotels);

module.exports = model;