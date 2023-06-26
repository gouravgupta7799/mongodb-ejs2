const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchma = new Schema({
  name: {
    type: String,
    require: true
  }, email: {
    type: String,
    require: true
  }, cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
      },
      quntety: {
        type: Number,
        require: true
      }
    }]
  }
})

module.exports = mongoose.model('User', userSchma)
