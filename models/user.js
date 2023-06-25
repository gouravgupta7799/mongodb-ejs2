const mongodb = require('mongodb');

const getdb = require('../util/dataBase').getdb;

class User {
  constructor(id, name, email, cart) {
    this._id = id
    this.name = name;
    this.email = email;
    this.cart = cart
  }

  save() {
    const db = getdb();
    return db.collection('users').insertOne(this)
      .then(result => {
        // console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  addToCart(product) {
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
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity
      })
    }
    const updatedCart = {
      items: updatedCartItems
    }
    const db = getdb()
    return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } })

  }

  static findById(userId) {
    const db = getdb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
  }
}

module.exports = User;