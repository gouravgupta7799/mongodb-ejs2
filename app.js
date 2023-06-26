const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
dotenv.config()
const errorController = require('./controllers/error');
// const User = require('./models/user');
const mangoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('6496d065c6db21587c58a3e5')
//     .then(user => {
//       req.user = new User(user._id, user.name, user.email, user.cart)
//       // console.log(user)
//       next()
//     })
//     .catch(err => console.log(err))
// })

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);



mangoose.connect(`mongodb+srv://Gourav123:${process.env.mongo_password}@cluster0.dbhrseh.mongodb.net/shop?retryWrites=true&w=majority`)
  .then(re => {
    app.listen(4000)
    console.log('connected')
  })
  .catch(err => {
    console.log(err)
  })