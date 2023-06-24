const mongodb = require('mongodb');
const getdb = require('../util/dataBase').getdb;

class Product {
  constructor(id, title, imageUrl, description, price) {
    this._id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getdb();
    let dbop;
    if (this._id) {
      dbop = db.collection('products').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this }, { upsert: true })
    } else {
      dbop = db.collection('products').insertOne(this)
    }

    return dbop
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
  }

  static fatchAll() {
    const db = getdb();
    return db.collection('products').find().toArray()
      .then(product => {
        console.log(product)
        return product;
      })
      .catch(err => console.log(err))
  }

  static findById(prodId) {
    const db = getdb();
    return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => console.log(err))
  }

  static deleteById(prodId) {
    const db = getdb();
    return db.collection('products').deleteOne({ _id:new mongodb.ObjectId(prodId) })
      .then(product => {
        console.log('deleted');
      })
      .catch(err => console.log(err))
  }
}


module.exports = Product;