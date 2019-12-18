var mongoose = require('mongoose');

var hotels = new mlongoose.Schema({
    hotelName: {type: String,
                index: true}
});

var model = mongoose.model('hotels', hotels);

module.exports = model;