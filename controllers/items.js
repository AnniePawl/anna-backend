
module.exports = function(app, Item, Comment) {

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
      Comment.find({itemId: req.params.id}).then(comments => {
          res.render('items-show', { item: item, comments: comments })
      })

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
}
