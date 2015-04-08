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

//server variables
var mongoDBName = "displayTest";
var mongoCollection = "collectionTest";
var nodejsPort = "3003";

//app
var app = express();

//display
app.get('/display', function(req, res) {
	var db = mongojs(mongoDBName);
	var collection = db.collection(mongoCollection);

	var html = "";
	collection.find( {}, function (err, docs) {

		console.log(docs);
		html = html + JSON.stringify(docs);

		//page creation
		var page = html;
		res.send(page);	
	});
});

app.listen(nodejsPort);
console.log('running...');