const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');

const User = require('./models/user');
const routes = require('./config/routes');
const { port, dbURI } = require('./config/environment');

mongoose.connect(dbURI);

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use(expressLayouts);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride((req)=> {
  if(req.body && typeof req.body ==='object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

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
      res.locals.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });
});

app.use(routes);

app.listen(port, () => console.log('Express started on port:'));
