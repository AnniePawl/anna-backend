
const express = require('express')
const Comment = require('../models/comment')
const app = express()

module.exports = function (app, Comment) {

    // CREATE Comment
    app.post('/items/:itemId/comments/new', (req, res) => {
        console.log(req.body)
      Comment.create(req.body).then(comment => {
        res.redirect('/items/' + comment.itemId)
      }).catch((err) => {
        console.log(err.message)
      })
    })
}
