var express = require('express');
var app = express();
var fs = require("fs");

var url="../json/" + "users.json";
app.get('/listUsers', function(req, res) {

	fs.readFile(url, 'utf8', function(err, data) {
		console.log(data);
		res.end(data);
	});
});
var user = {
		   "user4" : {
		      "name" : "mohit",
		      "password" : "password4",
		      "profession" : "teacher",
		      "id":"4"
		   }
		};

		app.post('/addUser', function (req, res) {
		   // First read existing users.
		  console.log("Inside add User");
			fs.readFile(url, 'utf8', function (err, data) {
				console.log("Read Data "+ data);
				data = JSON.parse( data );
				console.log("Parseed  Data "+ data);
		      data["user4"] = user["user4"];
		      console.log( data );
		      res.end( JSON.stringify(data));
		   });
		});

		app.get('/:id', function (req, res) {
			   // First read existing users.
			   fs.readFile( url, 'utf8', function (err, data) {
			      var users = JSON.parse( data );
			      var user = users["user" + req.params.id] 
			      console.log( user );
			      res.end( JSON.stringify(user));
			   });
			});
		
		var id = 2;

		app.delete('/deleteUser', function (req, res) {
		   // First read existing users.
		   fs.readFile(url, 'utf8', function (err, data) {
		      data = JSON.parse( data );
		      delete data["user" + 2];
		       
		      console.log( data );
		      res.end( JSON.stringify(data));
		   });
		})

var server = app.listen(8082, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});