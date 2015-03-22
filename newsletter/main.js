/*

	TOFU Newsletter
	-- Flavor to taste --

	Basic newsletter signup template for use with nodejs and mongodb.
	Does not have double-opt-in, error checking, or entry verification.
	Please use (and modify) at own risk!

	(C) 2015 golddiamonds
	Licensed under the MIT License

*/

var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

//server variables
var mongoDBName = "newsletter";
var nodejsPort = "3000";

//newsletter variables
var newsletterName = "TOFU's Newsletter";
var siteName = "TOFU";
var newsletterDescription = "Receive more information about TOFU! Sign up below.";

var app = express()
			.use(bodyParser());

app.get('/', function(req, res) {
	//simple css
	var html = '<html> \
				<head> \
				<style type="text/css"> \
					body{ \
						font:14px/20px \'Helvetica\', Arial, sans-serif; \
						margin:0; \
						padding: 75px 0 0 0; \
						text-align:center; \
						-webkit-text-size-adjust:none; \
					} \
					.newsletter{ \
						width:600px; \
						margin:0 auto 10px auto; \
						text-align: justify; \
						color:#333333; \
						padding:20px; \
					} \
					.input {\
						padding:0 0 6px 0 !important; \
						width:100%; \
						border:2px solid #d0d0d0; \
						border-radius:3px; \
						-webkit-appearance: none; \
					} \
				</style> \
				</head> \
				<body>' 

	html = html + "<h1>" + newsletterName + "</h1>";

	html = html + '<div class="newsletter">' + newsletterDescription + '<p />';
	html = html + '<form action="/" method="post">'
		+ "Email Adress:<br />"
		+	'<input type="text" name="email" class="input" /><p />'
		+	'First Name:<br />'
		+	'<input type="text" name="first" class="input" /><p />'
		+	'Last Name:<br />'
		+	'<input type="text" name="last" class="input" /><p />'
		+	'Favorite Color:<br />'
		+	'<input type="text" name="color" class="input" /><p />'
		+	'<input type="submit" value="Subscribe" /><p />'
		+	'</form></div>'
	var page = html;
	res.send(page);
});

app.post('/', function(req, res) {
	var db = mongojs(mongoDBName);

	var subscribers = db.collection("subscribers");

	subscribers.insert( { email: req.body.email, firstName: req.body.first, lastName: req.body.last,
							favoriteColor: req.body.color, timeStamp: new Date() },
							function (err, details) {});
	var html = '<head> \
				<style type="text/css"> \
					body{ \
						font:14px/20px \'Helvetica\', Arial, sans-serif; \
						margin:0; \
						padding: 75px 0 0 0; \
						text-align:center; \
						-webkit-text-size-adjust:none; \
					} \
				</style> \
				<body>';

	html = html + "Thank you for signing up with the " + newsletterName + "."
	html = html + 	'<p /><a href="' + siteURL + '">Back to ' + siteName + '</a>';

	var page = html;
	res.send(page);	
});

app.listen(nodejsPort);
console.log('running...');
