var express = require('express'),
	bodyParser = require('body-parser'),
	ejs = require('ejs'),
	engine = require('ejs-locals'),
	app = express(),
	mongoose = require('mongoose'),
	serverPort = process.env.PORT || 5000;


app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/templates');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('db initialized');

	// Init Controllers
	var models = require('./models/index.js')(mongoose);
	require('./controllers/index.js')(app, models);
});

app.listen(serverPort, function(){
	console.log('Listening on port '+serverPort+'..');
});