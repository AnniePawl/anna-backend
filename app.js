// Initializing Handlebars.js in appp
var exphbs = require('express-handlebars');

// Standard Express.js Modules and Obejcts
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');



//Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/anna-backend2',
{useNewUrlParser: true});


const Item = require('./models/item');
const Comment = require('./models/comment')

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//Import Routes (eventually)
//const items = require ('./controllers/items')

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Import Routes + Set up
const items = require('./controllers/items')(app, Item, Comment);
const comments = require('./controllers/comments')(app, Comment);

//Server Start
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
