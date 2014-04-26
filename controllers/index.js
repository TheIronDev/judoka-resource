module.exports = function(app){

	require('./techniques')(app);
	require('./posts')(app);

	app.get('/', function(req, resp) {
		resp.render('home', {});
	});
};