// Initializing Handlebars.js in appp
var exphbs = require('express-handlebars');

// Standard Express.js code Modules and Obejcts
const express = require('express')
const app = express()

//Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/anna-backend',
{useNewUrlParser: true});


const Item = mongoose.model('Item', {
  item: String,
  itemTitle: String
});


//Import Routes (eventually)
//const items = require ('./controllers/items')

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// INDEX
app.get('/', (req, res) => {
  Item.find()
    .then(items => {
      res.render('items-index', { items: items });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW
app.get('/items/new', (req, res) => {
  res.render('items-new', {});
})

//Middleware (eventually)


//Server Start
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
