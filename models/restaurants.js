var mongoose = require('mongoose');

var restaurants = new mongoose.Schema({

    restaurantname: {type: String,
                index: true},

    address: {type: String,
                index: true},
    
    city: {type: String,
                index: true},

    country: {type: String,
                index: true},  

    stars: {type: Number,
                index: true},

    foodtype: {type: String,
                index: true},

    price: {type: Number,
                index: true},         
    
});



var model = mongoose.model('restaurants', restaurants);

module.exports = model;