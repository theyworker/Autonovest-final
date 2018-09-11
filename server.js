const express = require('express');
// geting the Express Web Framework Module

const app = express();
//declaring the app variable and making it an instance of express

const port = 3000;
//assigning port variable for server

const Web3 = require('web3');
//getting WEB3js api Module

const truffle_connect = require('./connection/app.js');
//getting app.js
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var path = require('path');
//path module

// parse application/json
app.use(bodyParser.json());

//templating-----------
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'src')));


//routing in separate .js file----------
require('./routes/routes.js')(express, app);


app.listen(port, () => {

//setting web3 provider
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  console.log("Autonovest Listening at http://localhost:" + port);

});
