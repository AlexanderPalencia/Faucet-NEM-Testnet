var express = require('express');
require('dotenv').config({path: './config.env'});
var app = express();

app.get('/', function (req, res) {
  res.send('API Alex, put a valid end-point');
});

app.listen(process.env.port, function () {
  console.log('Example app listening on port 3000!');
});
