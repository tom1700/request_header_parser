'use strict';

var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();
require('dotenv').load();

mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
app.get("/whoami",function(req,res){
	var user_agent = req.headers['user-agent'].split(" ");
	res.send("{ipaddress:"+req.headers['x-forwarded-for']+
			",language:"+req.headers['accept-language'].split(",")[0]+
			",software:"+user_agent[1].substr(1)+" "+user_agent[2]+" "+user_agent[3]+" "+user_agent[4].replace(")","")+
			"}");
});