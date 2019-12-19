var express = require('express'); 
var router = express.Router();
var restaurantsModel = require('../models/restaurants');

router.get('/add',function(req,res){
  console.log('GET /restaurants/add')
  res.render('addrestaurants')
});

router.post('/addrestaurants', function(req, res){
    console.log('POST/addrestaurants');
    console.log("req.body", req.body);
    
    var restaurants={
        name: req.body.name,
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

router.get('/',function(req,res){
  console.log('/addrestaurants')
    restaurantsModel.find({},function (err, restaurants){
     
            res.json({
        success: true,
        data: restaurants
      });
    });
});

router.get("/:id", function(req, res) {
  console.log('/restaurants/:id')
    restaurantsModel.findOne({ _id: req.params.id }, function(err, restaurant) {
      res.json({
        success: true,
        data: restaurant
      });
    });
  });

router.delete("/:id", function(req, res) {
  console.log('delete/restaurants/:id')
    restaurantsModel.deleteOne({ _id: req.params.id }, function(err, restaurant) {
      console.log("delete restaurant", restaurant); // returns an object of what has been deleted
      res.json({
        success: true,
        data: {
          isDeleted: true
        }
      });
    });
  });

  router.put("/:id", function(req, res) {
    console.log('Update/restaurants/:id')
      restaurantsModel.updateOne({ _id: req.params.id},{ city: req.query.city}, function(err, result) {
      console.log("update restaurant", result); // returns an object of what has been deleted
        res.json({
          success: true,
          data: {
            isUpdate: true
          }
        });
      });
    });

module.exports= router;