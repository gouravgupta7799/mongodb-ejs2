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
      quantity: {
        type: Number,
        require: true
      }
    }]
  }
})

userSchma.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });

  let updatedCartItems = [...this.cart.items]
  let newQuantity = 1;

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    })
  }
  const updatedCart = {
    items: updatedCartItems
  }
  this.cart = updatedCart;
  return this.save()
}

userSchma.methods.deleteCartItem = function (prodIds) {
  const updatedCartItems = this.cart.items.filter(product => {
    return product.productId.toString() !== prodIds.toString()
  })
  this.cart = updatedCartItems;
  return this.save()
}

module.exports = mongoose.model('User', userSchma)
