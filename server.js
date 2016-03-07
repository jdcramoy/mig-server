
// includes
var http = require('http');
var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require("body-parser");
var request = require('request');
var querystring = require('querystring');
var email;
var portal_id;
var firstname;

//set the port
app.set('port', (process.env.PORT || 5000));
//to serve files from the public directory
app.use(express.static(__dirname + '/public'));
//standard response for a get request to the server
app.use(function(request, response, next){
	response.header('Access-Control-Allow-Origin','*');
	response.header('Access-Control-Allow-Methods', 'GET, POST');
	response.header('Access-Control-Allow-Headers', 'Content-Type,  X-Requested-With');
	next();
})

app.get('/', function(request, response) {
 response.send('HIT ME WITH SOME DATA, MEOW!!');
});
//parsers to help with the request data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//end point to handle post requests coming to the server
app.post('/', function(request, response){
	    email = request.body.email;
	    portal_id = request.body.portal_id;
	    firstname = request.body.firstname
	    console.log(email);
	    console.log(portal_id);
	    console.log(firstname);
	    response.end("yes");
	    app.emit('postedtohs');
 }); 

//listen for incoming Post Requests and make post requests
app.on('postedtohs', function PostCode(codestring) {
      // Build the post data
      var post_data = querystring.stringify({
          'email' : email,
          'portal_id': portal_id,
          'firstname': firstname
      });
      
      //POST option
      var post_options = {
          host: 'forms.hubspot.com',
          path: '/uploads/form/v2/60145/0ae3bcf1-017e-4da4-8486-0a4ee976a601/',
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': post_data.length
          }
      };

      // Set up the request
      var post_req = http.request(post_options, function(response) {
          response.setEncoding('utf8');
          response.on('data', function (chunk) {
              console.log('Response: ' + chunk);
          });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();

   });

//server is listening
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});






