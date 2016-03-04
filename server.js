
// includes
var http = require('http');
var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require("body-parser");
var request = require('request');
var querystring = require('querystring');
var email;
var hubid;
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
	    hubid = request.body.hubid;
	    firstname = request.body.firstname
	    console.log(email);
	    console.log(hubid);
	    console.log(firstname);
	    response.end("yes");
	    app.emit('postedtohs');
 }); 

//listen for incoming Post Requests and make post requests
app.on('postedtohs', function PostCode(codestring) {
      // Build the post data
      var post_data = querystring.stringify({
          'email' : email,
          'hubid': hubid,
          'firstname': firstname
      });
      
      //POST option
      var post_options = {
          host: 'forms.hubspot.com',
          path: '/uploads/form/v2/435353/cbe5ce25-2904-4634-953e-aef4e3570eb7',
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






