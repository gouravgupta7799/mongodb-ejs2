const mongodb = require('mongodb');

const getdb = require('../util/dataBase').getdb;

class User {
  constructor(id, name, email) {
    this.name = name;
    this.email = email;
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

  static findById(userId) {
    const db = getdb();
    return db.collection('users').findOne({_id:new mongodb.ObjectId(userId)})
  }
}

module.exports = User;