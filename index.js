const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');

const routes = require('./config/routes');
const User = require('./models/user');

const databaseURI = 'mongodb://localhost/mongo-intro';

mongoose.connect(databaseURI);

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  if(!req.session.userId) return next();
  User
    .findById(req.session.userId)
    .populate({path: 'recipes', populate: {path: 'creator'}})
    .exec()
    .then((user) =>{
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      next();
    });
});

app.use(routes);

app.listen(4000, () => console.log('Express started on port: 4000'));
