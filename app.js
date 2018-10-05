// Initializing Handlebars.js in appp

var exphbs = require('express-handlebars');

// Standard Express.js code Modules and Obejcts
const express = require('express')
const app = express();
const PORT = 3000;

//Database (Eventually)

//Import Routes (eventually)
//cont items = require ('./controllers/items')

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// INDEX
app.get('/', (req, res) => {
  res.render('items-index', { items: items });
})
//Middleware (eventually)

//Mock Item Stuff
let items = [
    { title : "Great Item", itemTitle: "Strickers" },
    { title : "Awesome Service", itemTitle: "Badass Haricut" },
]



//Server Start
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
