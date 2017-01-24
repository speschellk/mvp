var express = require('express');
var mongoose = require('mongoose');

var app = express();

// render index.html at homepage
app.use(express.static(__dirname + '/client'));

// listen on port 3000
app.listen(3000, function() {
  console.log('Listening on port 3000');
});

// export app
module.exports = app;