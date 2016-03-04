
// include the http module
/*var http = require('http');
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
}); 
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
}); */

var http = require('http');

http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    // BEGINNING OF NEW STUFF

    response.on('error', function(err) {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      body: body
    };

    response.write(JSON.stringify(responseBody));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  });
}).listen(8080);


