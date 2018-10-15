// Initializing Handlebars.js in appp
var exphbs = require('express-handlebars');

// Standard Express.js Modules and Obejcts
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/anna-backend',
{useNewUrlParser: true});


const Item = mongoose.model('Item', {
  title: String,
  description: String,
  itemTitle: String,
  rating: String,
});

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


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

// SHOW
app.get('/items/:id', (req, res) => {
  Item.findById(req.params.id).then((item) => {
    res.render('items-show', { item: item })
  }).catch((err) => {
    console.log(err.message);
  })
})

//CREATE
app.post('/items', (req, res) => {
console.log(req.body)
  Item.create(req.body).then((item) => {
    console.log(item)
    res.redirect(`/items/${item._id}`)
    // Redirect to items/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

//EDIT
app.get('/items/:id/edit', (req, res) => {
  Item.findById(req.params.id)
  .then(item => {
    res.render('items-edit', {item: item});
}).catch(err => {
    console.log(err)
})
})

//UPDATE
app.put('/items/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then(item => {
      res.redirect(`/items/${item._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/items/:id', function (req, res) {
  console.log("DELETE Item Listing")
  Item.findByIdAndRemove(req.params.id).then((item) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

//Server Start
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
