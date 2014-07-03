var passport = require('passport');

/**
 * Authentication routes
 * @param app
 */
module.exports = function (app, Account) {

	function registerPage(req, res) {
		res.render('account/register', req.model);
	}

	function postRegistration(req, res) {
		Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
			if (err) {
				req.model.account = account;
				return res.render('account/register', req.model);
			}

			passport.authenticate('local')(req, res, function () {
				res.redirect('/');
			});
		});
	}

	function loginPage(req, res) {
		res.render('account/login', req.model);
	}

	function redirectToLogin(req, res) {
		res.redirect('/');
	}

	function logoutPage(req, res) {
		req.logout();
		res.redirect('/');
	}

	app.get('/register', registerPage);
	app.get('/login', loginPage);
	app.get('/logout', logoutPage);

	app.post('/register', postRegistration);
	app.post('/login', passport.authenticate('local'), redirectToLogin);
};