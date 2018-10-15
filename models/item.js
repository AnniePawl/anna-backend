const mongoose = require('mongoose');

module.exports = mongoose.model('Item', {
  title: String,
  description: String,
  itemTitle: String,
  rating: String,
});
