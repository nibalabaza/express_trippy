var express = require ('express');
var exphbs = require ('express-handlebars');
var mongoose = require ('mongoose');
var bodyparser = require ('body-parser');
var hotelsModel = require('./models/hotels');
var restaurantsModel = require('./models/restaurants');

var port = 3000;
var app = express();
// configuration

app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set ('view engine','handlebars');
app.use(bodyparser.urlencoded({extended:false}));
app.use (bodyparser.json());

mongoose.connect('mongodb://localhost:27017/express-trippy', {
  useNewUrlParser: true,
  useCreateIndex : true,
  useUnifiedTopology: true
},function(err){
    if(err!== null){
        console.log('Connection error err', err);
    }else{
        console.log('DB connected');
    }
});


// routes


app.get('/',function(req,res){
    res.render('home')
});

app.post('/addhotels', function(req, res){
    console.log('POST/addhotels');
    console.log("req.body", req.body);
    
    var hotels={
        hotelname: req.body.hotelname,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        stars: req.body.stars,
        spa: req.body.spa,
        pool: req.body.pool,
        price: req.body.price,

    };
     console.log(hotels);
    hotelsModel.create(hotels, function (err, document) {
        if (err !== null) {
            console.log('Err saved user', err);
            return;
        }
        res.json({
                success: true,
                data:document
        });
    });
});

app.get('/hotels',function(req,res){
    hotelsModel.find({},function (err, hotels){
     
            res.json({
        success: true,
        data: hotels
      });
    });
});

app.get("/hotels/:id", function(req, res) {
    hotelsModel.findOne({ _id: req.params.id }, function(err, hotel) {
      res.json({
        success: true,
        data: hotel
      });
    });
  });


  /**restaurants */

  app.post('/addrestaurants', function(req, res){
    console.log('POST/addrestaurants');
    console.log("req.body", req.body);
    
    var restaurants={
        restaurantname: req.body.restaurantname,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        stars: req.body.stars,
        foodtype: req.body.foodtype,
        price: req.body.price,

    };
     console.log(restaurants);
    restaurantsModel.create(restaurants, function (err, document) {
        if (err !== null) {
            console.log('Err saved user', err);
            return;
        }
        res.json({
                success: true,
                data:document
        });
    });
});

app.delete("/hotels/:id", function(req, res) {
    StudentModel.deleteOne({ _id: req.params.id }, function(err, hotel) {
      console.log("delete hotel", hotel); // returns an object of what has been deleted
      res.json({
        success: true,
        data: {
          isDeleted: true
        }
      });
    });
  });

app.get('/restaurants',function(req,res){
    restaurantsModel.find({},function (err, restaurants){
     
            res.json({
        success: true,
        data: restaurants
      });
    });
});

app.get("/restaurants/:id", function(req, res) {
    restaurantsModel.findOne({ _id: req.params.id }, function(err, restaurant) {
      res.json({
        success: true,
        data: restaurant
      });
    });
  });






app.listen(port, function(){
    console.log('server starder on port:',port);

});