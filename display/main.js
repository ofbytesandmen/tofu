/*

	TOFU Display
	-- Flavor to taste --

	Basic mongodb browser display app for use with nodejs and mongodb.
	Please use (and modify) at own risk!

	(C) 2015 golddiamonds
	Licensed under the MIT License

*/

var express = require('express');
var mongojs = require('mongojs');
var config = require('./config');

//server variables
var mongoDBName = config.mongoDBName;
var mongoCollection = config.mongoCollection;
var nodejsPort = config.nodejsPort;

//app
var app = express();

//display
app.get('/display', function(req, res) {
	var db = mongojs(mongoDBName);
	var collection = db.collection(mongoCollection);

	var html = "";
	collection.find( {}, function (err, docs) {

		// Uncomment the following if you want to print out to console
		//console.log(docs);

		// Uncomment the following if you want to print ou the entire json.
		//html = html + JSON.stringify(docs);

		for (i = 0; i < docs.length, i++) {
			html = html + "<p>" + JSON.stringify(docs[i]);
		}
		
		//page creation
		var page = html;
		res.send(page);	
	});
});

app.listen(nodejsPort);
console.log('running...');