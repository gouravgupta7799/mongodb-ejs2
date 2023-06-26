const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');
const { INTEGER } = require('sequelize');

const Schma = mongoose.Schema

const productSchma = new Schma({
  title: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true 
  },
  description: {
    type: String,
    require: true
  },
  imageUrl: {
    type: String,
    require: true 
  },

})

module.exports = mongoose.model('Product',productSchma);