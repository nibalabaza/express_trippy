var express = require ('express');
var exphbs = require ('express-handlebars');
var mongoose = require ('mongoose');
var bodyparser = require ('body-parser');
var hotelsModel = require('./models/hotels');
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
    usersModel.find({},function (err, documents){
        if (err !== null){
            console.log('Cannot get users err', err);
        }else{
            console.log('documents', documents);
            var obj = {
                hotels : documents
            };
            console.log('obj', obj);
            res.render('home', obj);
        }
    });

});


app.post('/addhotels', function(req, res){
    console.log('POST/addhotels');
    console.log("req.body", req.body);
    
    var hotels={
        hotelname: req.body.hotelname,
        

    };

    hotelsModel.create(hotels, function (err, document) {
        if (err !== null) {
            console.log('Err saved user', err);
            return;
        }
        res.render('addhotels');
    });
    
});




app.listen(port, function(){
    console.log('server starder on port:',port);

});