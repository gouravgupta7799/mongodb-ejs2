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
  req.user.getCartI()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
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
      console.log(result)
      res.redirect('/cart')
    })
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
    .catch(err => console.log(err))

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
