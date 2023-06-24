
// let fs = require('fs');
// let path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'cart.json'
// );

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     //fetch data from cart
//     fs.readFile(p, (error, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!error) {
//         cart = JSON.parse(fileContent);
//       }
//       //Analyze the cart
//       let existingProductIndex = cart.products.findIndex(prod => prod.Id === id);
//       let existingProduct = cart.products[existingProductIndex]
//       let updatedProduct;
//       //add new product
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1
//         cart.products = [...cart.products]
//         createDecipheriv.process[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       };
//       cart.totalPrice = cart.totalPrice + +productPrice;
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       });
//     });
//   };


// }

const Sequelize = require('sequelize');

const sequelize = require('../util/dataBase');

const cart = sequelize.define('cart', {
  id: {
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
module.exports = cart;