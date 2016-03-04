
// include the http module
var http = require('http');
var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require("body-parser");
var request = require('request');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var email;
var hubid;

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
 response.send('HIT ME WITH SOME DATA');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(request, response){
	    email = request.body.email;
	    hubid = request.body.hubid;
		console.log(email);
	    console.log(hubid);
	    console.log("test");
	    response.end("yes");
	    app.emit('postedtohs');
 
}); 

app.on('postedtohs', function PostCode(codestring) {
      // Build the post string from an object
      var post_data = querystring.stringify({
          'email' : email,
          'hubid': hubid
      });

      // An object of options to indicate where to post to
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



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});






