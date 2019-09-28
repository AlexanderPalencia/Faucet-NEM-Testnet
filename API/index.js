var express = require('express');
require('dotenv').config({path: '../config.env'});
let nem = require("nem-sdk").default;
var app = express();

app.get('/', function (req, res) {
  res.send('API Alex, put a valid end-point');
});

app.get('/faucet', function (req, res) {
  let Address = req.query.add;

  res.send('Holis');
});

app.listen(process.env.port, function () {
  console.log('Example app listening on port 3000!');
});
