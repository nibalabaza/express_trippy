var express= require('express');
var router = express.Router();
var hotelsModel = require('../models/hotels');


router.get('/add',function(req,res){
    console.log('GET /hotels/add');
    res.render('addhotels')
});


// ajouter un hotel

router.post('/addhotels', function(req, res){
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


// afficher tous les hotels

router.get('/',function(req,res){
    hotelsModel.find({},function (err, hotels){
     
            res.json({
        success: true,
        data: hotels
      });
    });
});


// afficher un hotel

router.get("/:id", function(req, res) {
    hotelsModel.findOne({ _id: req.params.id }, function(err, hotel) {
      res.json({
        success: true,
        data: hotel
      });
    });
  });

// update 
  
router.put("/:id", function(req, res) {
    console.log("put /hotels/:id");
    console.log("req.query",req.query )
    console.log("req.params",req.params);
    console.log("req.body", req.body);
    hotelsModel.updateOne({ _id: req.params.id },{ hotelname: req.query.hotelname},function(err, hotel) {
      console.log("update hotel", hotel);
       // returns an object of what has been deleted
      res.json({
        success: true,
        data: {
          isUpdate: true
        }
      });
    });
  });


// supprimer le restaurant
  
router.delete("/:id", function(req, res) {
    hotelsModel.deleteOne({ _id: req.params.id },function(err, hotel) {
      console.log("delete hotel", hotel); // returns an object of what has been deleted
      res.json({
        success: true,
        data: {
          isDeleted: true
        }
      });
    });
  });



  module.exports = router;