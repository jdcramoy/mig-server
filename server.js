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

app.get('/', function(request, response) {
 response.send('HIT ME WITH SOME DATA');
});

app.post('/user/:email/:hubid', function(req, res) {
 console.log(req.params.email);
 console.log(req.params.hubid);
});

app.post('/', function(req, res){
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});


//var bodyParser = require('body-parser');

