var passport = require('passport'),
	md5 = require('MD5'),
	_ = require('underscore');

/**
 * Authentication routes
 * @param app
 */
module.exports = function (app, models) {

	var UserModel = models.UserModel,
		PostModel = models.PostModel,
		JudoRanks = models.JudoRanks,
		rankRegex = new RegExp(/\s/);

	function registerPage(req, res) {
		res.render('user/register', req.model);
	}

	function adminPage(req, res, next) {
		var user = req.user;
		if (!user || !user.isAdmin) {
			req.model.error = {
				message: 'Sorry, you do not have appropriate privileges'
			}
			req.model.isAdmin = false;
			return res.render('user/admin', req.model);
		}

		req.model.isAdmin = true;
		next();
	}

	function renderAdminPage(req, res) {
		res.render('user/admin', req.model);
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

	// Update user
	function updateUser(req, resp) {
		var payload = req.body,
			user = req.user || {},
			updates = {},
			username = user.username;

		if (payload.gravatarEmail) {
			updates.gravatarEmail = payload.gravatarEmail;
			updates.gravatarHash = getGravatarHash(payload);
		}

		if (payload.email) {
			updates.email = payload.email;
		}

		if (payload.rank) {
			updates.rank = payload.rank;
		}

		UserModel.update({'username': username}, updates, {}, function(err, updatedUser) {
			if(err) return console.error(err) ;

			resp.json({user: updatedUser});
		});
	}

	function myAccountPage(req, resp) {

		req.model.judoRanks = JudoRanks;
		var user = req.model.user = req.user;
		if (!user) {
			return resp.render('user/login', req.model);
		}

		resp.render('user/myaccount', req.model);
	}

	function getGravatarHash(payload) {
		var gravatarEmail = payload.gravatarEmail,
			gravatarHash = md5(gravatarEmail.toLowerCase());

		return gravatarHash;
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
				if (user.rank) {
					user.rankClass = (user.rank).toLowerCase().replace(rankRegex, '-');
				}
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
				var filteredPost = _.pick(post, 'pageId', 'title', 'type', 'userId', 'url', 'approved', '_id');
				filteredPosts.push(filteredPost);
			});

			req.model.posts = filteredPosts;
			return res.render('user/userPosts', req.model);
		});
	}

	function getAllPosts(req, res, next) {
		PostModel.find(function(err, posts){

			var filteredPosts = [];
			if (err || !posts) {
				req.model.error = err;
			}

			posts.forEach(function(post){
				var filteredPost = _.pick(post, 'pageId', 'title', 'type', 'userId', 'url', 'approved', '_id');
				filteredPosts.push(filteredPost);
			});

			req.model.posts = filteredPosts;
			next();
		});
	}

	app.get('/users', getUsers, displayUsers);
	app.get('/users/:username', findUser, findPostsByUser);

	app.get('/myaccount', myAccountPage);
	app.post('/myaccount', updateUser);

	app.get('/register', registerPage);
	app.get('/login', loginPage);
	app.get('/admin', adminPage, getAllPosts, renderAdminPage);
	app.get('/logout', logoutPage);

	app.post('/register', postRegistration);
	app.post('/login', passport.authenticate('local'), redirectToLogin);
};