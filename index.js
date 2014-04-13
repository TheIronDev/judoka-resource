var express = require('express'),
	ejs = require('ejs'),
	engine = require('ejs-locals'),
	app = express(),
	serverPort = process.env.PORT || 5000;


app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/templates');
app.use(express.static(__dirname + '/public'));

// Init Controllers
require('./controllers/index.js')(app);

app.listen(serverPort, function(){
	console.log('Listening on port '+serverPort+'..');
});