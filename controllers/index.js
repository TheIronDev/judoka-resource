module.exports = function(app, models){

	/**
	 * Before any of the other routes hit, lets make sure req.model is populated
	 */
	app.all('*', function(req, resp, next) {
		var user = req.user;

		req.model = req.model || {};

		if(user) {
			req.model.user = user;
			req.model.isAdmin = user.isAdmin || false;
		} else {
			req.model.user = '';
			req.model.isAdmin = false;
		}

		req.model.error = '';

		next();
	});

	require('./techniques')(app);
	require('./user')(app, models);
	require('./posts')(app, models);

	app.get('/', function(req, resp) {
		resp.render('home', req.model);
	});
};