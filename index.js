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
	serverPort = process.env.PORT || 5000,
	node_env = process.env.NODE_ENV;

// Uncomment for nicer logging
// require('console.star');

// If we are in development mode, lets set the AWS key with our config file (not checked in)
if (node_env && node_env === 'development') {
	var developConfig = require('./config/development');
	
	process.env.AWS_ACCESS_KEY_ID = developConfig.AWS_ACCESS_KEY_ID;
	process.env.AWS_SECRET_ACCESS_KEY = developConfig.AWS_SECRET_ACCESS_KEY;
	process.env.S3_BUCKET = developConfig.S3_BUCKET;
}

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/templates');
app.use(express.static(__dirname + '/public'));


app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('unicorns and candy'));
app.use(connect.session());
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);

if (process.env.MONGOHQ_URL) {
	mongoose.connect(process.env.MONGOHQ_URL);
} else {
	mongoose.connect('mongodb://localhost/test');
}

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