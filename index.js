var express = require ('express');
var exphbs = require ('express-handlebars');
var mongoose = require ('mongoose');
var bodyparser = require ('body-parser');
var hotelsModel = require('./models/hotels');
var restaurantsModel = require('./models/restaurants');
var hotelsController = require('./controllers/hotels');

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


app.use('/hotels',hotelsController);

app.listen(port, function(){
    console.log('server starder on port:',port);

});