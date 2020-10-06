const express = require ('express');
const bodyParser = require ('body-parser');

const App = express();

const User = require('./routes/user');

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended:false}));
App.use('/user',User);


module.exports = App;