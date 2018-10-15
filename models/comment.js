const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Comment', {
    title: String,
    content: String,
    itemId: { type: Schema.Types.ObjectId, ref: 'Item' }
  });
