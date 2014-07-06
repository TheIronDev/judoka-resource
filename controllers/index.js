module.exports = function(app, models){

	/**
	 * Before any of the other routes hit, lets make sure req.model is populated
	 */
	app.all('*', function(req, resp, next) {
		req.model = req.model || {};
		req.model.user = req.user || {};
		req.model.error = '';

		next();
	});

	require('./techniques')(app);
	require('./user')(app, models.UserModel);
	require('./posts')(app, models);

	app.get('/', function(req, resp) {
		resp.render('home', req.model);
	});
};