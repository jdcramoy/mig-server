
// include the http module
var http = require('http');
var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require("body-parser");

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
 response.send('HIT ME WITH SOME DATA');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit', function(request, response){
    if (err) {
    	res.send({message:'You broke it.'});
    	res.send(request.body);
  } else {
	    /*var email = request.body.email;
	    var hubid = request.body.hubid;
		console.log(request.body.email);
	    console.log(request.body.hubid);
	    res.end("yes");*/
  }

}); 

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});






