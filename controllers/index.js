module.exports = function(app){

	require('./techniques')(app);

	app.get('/', function(req, resp) {
		resp.render('home', {});
	});
};