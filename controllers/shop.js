const Product = require('../models/product.js');
const Order = require('../models/order.js');

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

  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } }
      })
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      })
      return order.save()

    })
    .then(result => {
      return req.user.clearCart()
    })
    .then(o => {
      res.redirect('/Orders')
    }).catch(err => {
      console.log(err)
    })
}

exports.getOrders = (req, res, next) => {

  Order.find({ 'user.userId': req.user._id })
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
