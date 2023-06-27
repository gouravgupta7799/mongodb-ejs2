const Product = require('../models/product.js');
// const cart = require('../models/cart.js');

exports.getProducts = (req, res, next) => {
  Product.find()
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
  Product.find()
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
  req.user
    .populate('cart.items.productId')
    .then(user => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: user.cart.items
      })
    })
    .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product)
    }).then(result => {
      // console.log(result)
      res.redirect('/cart')
    })
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteCartItem(prodId)
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))

}

exports.postOrders = (req, res, next) => {
  req.user.addOrder()
    .then(result => {
      res.redirect('/Orders')
    }).catch(err => {
      console.log(err)
    })
}

exports.getOrders = (req, res, next) => {
  req.user.seeOrder()
    .then(order1 => {
      // console.log(order1)
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: order1
      });
    })
    .catch(err => console.log(err))
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
