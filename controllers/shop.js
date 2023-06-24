const Product = require('../models/product.js');
// const cart = require('../models/cart.js');

exports.getProducts = (req, res, next) => {
  Product.fatchAll()
    .then(row => {
      res.render('shop/product-list', {
        prods: row,
        pageTitle: 'All Products',
        path: '/products'
      })
    })
    .catch(err => console.log(err))
};

exports.gtProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    })
    .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.fatchAll()
    .then(row => {
      res.render('shop/index', {
        prods: row,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fecthcart;
  req.user.getCart()
    .then(cart => {
      fecthcart = cart;
      return cart.getProducts()
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0]
      }
      let newQuantity = 1;
      if (product) {
        const oldQuntity = product.cartItem.quantity;
        newQuantity = oldQuntity + 1
        return Product.findByPk(prodId)
          .then(product => {
            return fecthcart.addProduct(product, {
              through: {
                quantity: newQuantity
              }
            });
          })
      }

      return Product.findByPk(prodId)
        .then(product => {
          return fecthcart.addProduct(product, {
            through: {
              quantity: newQuantity
            }
          });
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

    .then(res.redirect('/cart'))
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ WHERE: { id: prodId } })
    })
    .then(products => {
      const product = products[0]
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart')
    })
  .catch(err=>console.log(err))

}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
