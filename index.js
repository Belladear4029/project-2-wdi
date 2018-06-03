const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./config/routes');
const mongoose = require('mongoose');

const databaseURI = 'mongodb://localhost/mongo-intro';

mongoose.connect(databaseURI);

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);


app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.use(routes);

app.listen(4000, () => console.log('Express started on port: 4000'));
