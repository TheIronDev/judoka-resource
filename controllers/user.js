var passport = require('passport'),
	_ = require('underscore');

/**
 * Authentication routes
 * @param app
 */
module.exports = function (app, models) {

	var UserModel = models.UserModel,
		PostModel = models.PostModel;

	function registerPage(req, res) {
		res.render('user/register', req.model);
	}

	function postRegistration(req, res) {
		UserModel.register(new UserModel({ username : req.body.username }), req.body.password, function(err, user) {

			if (err || !user) {
				req.model.user = {};
				req.model.error = err;
				return res.render('user/register', req.model);
			}

			passport.authenticate('local')(req, res, function () {
				res.redirect('/');
			});
		});
	}

	function loginPage(req, res) {
		res.render('user/login', req.model);
	}

	function redirectToLogin(req, res) {
		res.redirect('/');
	}

	function logoutPage(req, res) {
		req.logout();
		res.redirect('/');
	}

	function displayUsers(req, res) {
		res.render('user/index', req.model);
	}

	// Get a list of the users and place them on a map
	function getUsers(req, resp, next) {
		UserModel.find(function(err, users){
			if (err) return console.error(err);

			var userList = req.model.userList = [];
			_.each(users, function(user) {
				userList.push(user);
			});
			next();
		});
	}

	function findUser(req, res, next) {
		var username = req.param('username');
		UserModel.findOne({'username': username}, function(err, selectedUser){

			req.model.selectedUser = selectedUser;
			if(err || !selectedUser || !selectedUser._id) {
				req.model.error = err;
			}

			next();
		});
	}


	function findPostsByUser(req, res, next) {

		var selectedUser = req.model.selectedUser || {};
		PostModel.find({'userId': selectedUser._id}, function(err, posts){

			var filteredPosts = [];
			if (err || !posts) {
				req.model.error = err;
			}

			posts.forEach(function(post){
				var filteredPost = _.pick(post, 'pageId', 'title', 'type', 'userId', 'url');
				filteredPosts.push(filteredPost);
			});

			req.model.posts = filteredPosts;
			return res.render('user/userPosts', req.model);
		});
	}

	app.get('/users', getUsers, displayUsers);
	app.get('/users/:username', findUser, findPostsByUser);

	app.get('/register', registerPage);
	app.get('/login', loginPage);
	app.get('/logout', logoutPage);

	app.post('/register', postRegistration);
	app.post('/login', passport.authenticate('local'), redirectToLogin);
};