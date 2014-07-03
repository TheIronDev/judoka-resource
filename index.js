var express = require('express'),
	connect = require('connect'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	ejs = require('ejs'),
	engine = require('ejs-locals'),
	app = express(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	serverPort = process.env.PORT || 5000;


app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/templates');
app.use(express.static(__dirname + '/public'));


app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('your secret here'));
app.use(connect.session());
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('db initialized');

	// Init Controllers
	var models = require('./models/index.js')(mongoose, passport);
	require('./controllers/index.js')(app, models);
});

app.listen(serverPort, function(){
	console.log('Listening on port '+serverPort+'..');
});