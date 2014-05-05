module.exports = function(app, models){

	require('./techniques')(app);
	require('./posts')(app, models);

	app.get('/', function(req, resp) {
		resp.render('home', {});
	});
};