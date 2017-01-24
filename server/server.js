var express = require('express');
var mongoose = require('mongoose');

var app = express();

// // test of GET response
// app.get('/', function (req, res) {
//   res.send('hello world');
// });

// // connect to database
// mongoose.connect('mongodb://localhost/cocktail-menu');

// configure server with middleware and routes
// require('./config/middleware.js')(app, express);
// require('./config/routes.js')(app, express);

// listen on port 3000
app.listen(3000, function() {
  console.log('Listening on port 3000');
});

// export app
module.exports = app;