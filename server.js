// include the http module
var http = require('http');

var express = require('express');
var app = express();
var pg = require('pg');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




