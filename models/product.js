
const getdb = require('../util/dataBase').getdb;

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getdb();
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
  }
}


module.exports = Product;