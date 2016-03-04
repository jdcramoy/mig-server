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

app.get('/form', function(request, response) {
 response.send('Send this endpoint some form DATA');
});

/*app.post('/user/:email/:hubid', function(req, res) {
 console.log(req.params.email);
 console.log(req.params.hubid);
}); */
//app.use(express.bodyParser());

app.post('/form', function(request, response){
    console.log(request.body.name);
    console.log(request.body.email);
}); 

var body = [];
request.on('data', function(chunk) {
  body.push(chunk);
  console.log(chunk);
}).on('end', function() {
  body = Buffer.concat(body).toString();
  console.log(body);
  // at this point, `body` has the entire request body stored in it as a string
});


