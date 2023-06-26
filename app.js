const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
dotenv.config()

const errorController = require('./controllers/error');
// const User = require('./models/user');
const mangoose = require('mongoose');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64997f61355a3e1f87334d5d')
    .then(user => {
      req.user = user
      // console.log(user)
      next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);



mangoose.connect(`mongodb+srv://Gourav123:${process.env.mongo_password}@cluster0.dbhrseh.mongodb.net/shop?retryWrites=true&w=majority`)
  .then(result => {

    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: 'Max',
            email: 'max@test.com',
            cart: {
              itens: []
            }
          })
          user.save();
        }
      }
      )
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });