const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
//########################################Final
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var path = require('path');
// parse application/json
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'src')));


require('./routes/routes.js')(express, app);


app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  console.log("Express Listening at http://localhost:" + port);

});
