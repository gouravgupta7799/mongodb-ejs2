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

  getCartI() {
    const db = getdb()
    let prodIds = this.cart.items.map(i => {
      return i.productId
    });
    return db.collection('products').find({ _id: { $in: prodIds } }).toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p, quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString()
            }).quantity
          }
        })
      })
  }

  deleteCartItem(prodIds) {
    const updatedCartItems = this.cart.items.filter(product => {
      return product.productId.toString() !== prodIds.toString()
    })
    const db = getdb()
    return db.collection('users').updateOne({
      _id: new mongodb.ObjectId(this._id)
    }, { $set: { cart: { items: updatedCartItems } } })
  }

  static findById(userId) {
    const db = getdb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
  }

  static findById(userId) {
    const db = getdb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
  }
}

module.exports = User;