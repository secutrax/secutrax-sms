"use strict";
var fs = require('fs');
var url = require('url');
var path = require('path');
var https = require('https');
var favicon = require('serve-favicon');
var logger = require('morgan');
var express = require('express');
var session = require('express-session');
const passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login');
const bodyParser = require('body-parser');
var serveIndex = require('serve-index');
var pg = require("pg");

//To include external js files
var nodeHelper = require("./node-helpers/user");

var app = express();   

var isWin = /^win/.test(process.platform);
var isHttps = true;

var portNumber = 8085;

for(var i=2;i<process.argv.length;i++)
{
    if(process.argv[i].indexOf('-port') > -1 || process.argv[i].indexOf('-p') > -1)
    {
        if(process.argv.length > i + 1)
        {
            portNumber = process.argv[i+1];
        }
    }

    if(process.argv[i].indexOf('-http') > -1)
    {
        isHttps = false;
    }
}


if(isHttps) 
{
    console.log('Enabling HTTPS...');
    var server = require('https').createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app);
}

else var server = require('http').createServer(app);


var socketio = require('socket.io')(server);

require('./authentication').init(app);

app.use(bodyParser.urlencoded({
  extended: false
}));

var jsonParser = bodyParser.json();

app.use(session({

  secret: "bubbles",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



app.get('/login', function(request, response){
		console.log("in");
      response.sendFile(__dirname+'/login.html');
  });

app.post('/login', passport.authenticate('local', {
      successReturnToOrRedirect: '/',
      failureRedirect: '/login'
    }));

app.use(logger('dev'));

app.all('/*', ensureLoggedIn.ensureLoggedIn('/login'));
//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use('/', express.static('public'));

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

server.listen(portNumber, function () {
  console.log('Started listening on port ' + portNumber);
});

require('./user').init(app);

app.get('/logout', function (req, res){
console.log("out in");
  req.session.destroy(function (err) {
  console.log("out middle + " + err);
    res.redirect('/login');
	// res.sendFile(__dirname+'/login.html');
  });
  console.log("out out");
});

app.post('/saveUser', jsonParser, nodeHelper.saveUser);
app.post('/saveFormat', jsonParser, nodeHelper.saveFormat);
