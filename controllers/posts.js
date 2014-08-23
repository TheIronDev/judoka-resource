module.exports = function(app, models){

	var passport = require('passport'),
		_ = require('underscore');

	var PostModel = models.PostModel,
		VoteModel = models.VoteModel,
		UserModel = models.UserModel;

	// Get a list of the users and place them on a map
	function getUsers(req, resp, next) {
		UserModel.find(function(err, users){
			if (err) return console.error(err);

			req.usersMap = {};
			_.each(users, function(user) {
				req.usersMap[user._id] = user.username;
			});
			next();
		});
	}

	// Get a list of the users and place them on a map
	function getVotes(req, resp, next) {

		var userId = req.user && req.user._id || '';

		VoteModel.find(function(err, votes){
			if (err) return console.error(err);

			req.votesByPostId = {};
			req.currentUserVotesByPostId = {};
			req.votes = votes;

			// TODO: Clean This up.
			_.each(votes, function(vote) {
				if (!req.votesByPostId[vote.postId]) {
					req.votesByPostId[vote.postId] = 0;
				}
				req.votesByPostId[vote.postId] += vote.score;
				if (vote.userId == userId) {
					req.currentUserVotesByPostId[vote.postId] = vote.score;
				}
			});
			next();
		});
	}

	function addVote(req, resp, next) {
		var payload = req.body,
			options = {'upsert': true},
			callback = function(err, respVote){
				if(err) {return console.error(err);}

				resp.json({vote: respVote});
			};

		payload.userId = req.user._id;
		payload.userPostId = payload.userId+'-'+payload.postId;

		VoteModel.update({'userPostId': payload.userPostId}, payload, options, callback);
	}

	function returnAllVotes(req, resp, next) {
		resp.json({
			votes: req.votes,
			votesByPostId: req.votesByPostId,
			currentUserVotesByPostId: req.currentUserVotesByPostId
		});
	}

	function returnVotesByPostId(req, resp, next) {

		var postId = req.param('postId') || '';
		resp.json({
			votes: req.votesByPostId[postId]
		});
	}

	/**
	 * Clean the posts for the json response
	 * @param posts
	 * @returns {*}
	 */
	function getFormattedPosts(posts, usersMap, votesMap) {
		return _.map(posts, function(post) {

			var formattedPost = _.pick(post, 'pageId', 'title', 'type', 'url', 'approved', 'timestamp'),
				postId = post._id,
				postDate = new Date(formattedPost.timestamp);
			formattedPost.id = postId;
			formattedPost.score = votesMap[postId] || 0;
			formattedPost.dateString = postDate.toDateString();
			formattedPost.username = usersMap[post.userId] || '';

			return formattedPost;
		});
	}

	// Return alll the posts!
	function returnAllPosts(req, resp) {

		PostModel.find(function (err, posts) {
			if (err) return console.error(err);

			var formattedPosts = getFormattedPosts(posts, req.usersMap, req.votesByPostId);

			resp.json({posts: formattedPosts});
		});
	}

	// Return posts by pageId
	function returnPostsByPageId(req, resp) {

		var pageId = req.param('pageId');
		PostModel.find({'pageId': pageId}, function(err, posts) {
			if(err) return console.error(err);

			var formattedPosts = getFormattedPosts(posts, req.usersMap, req.votesByPostId);
			resp.json({
				posts: formattedPosts,
				userVotes: req.currentUserVotesByPostId
			});
		});
	}

	// Return a single post by its unique id
	function returnPostById(req, resp) {

		var postId = req.param('postId');
		PostModel.findById(postId, function(err, post){
			if(err) return console.error(err);
			resp.json({post: post});
		});
	}

	// Create a new post
	function addNewPost(req, resp) {
		var payload = req.body;

		payload.userId = req.user._id;

		var newPost = new PostModel(payload);

		newPost.updateUrl(function(err) {
			if (err) {
				return resp.send(500, { error: err });
			}
			newPost.save();
			resp.json({posts: newPost});
		});
	}

	// Update an existing Post
	function updatePostById(req, resp) {
		var payload = req.body,
			postId = req.param('postId'),
			options = {},
			callback = function(err, post){
				resp.json({posts: post});
			};

		PostModel.update({_id: postId}, payload, options, callback);
	}

	// Remove a post from the database
	function removePostById(req, resp) {
		var postId = req.param('postId');
		PostModel.findById(postId, function(err, post){
			if(err) return console.error(err);

			post.remove();
		});
	}

	// Verify the user was logged in
	function validateUser(req, resp, next) {
		if(req.user) {
			return next();
		}

		resp.send(500, 'User is not logged in');
	}

	// Verify the user was logged in
	function isAdmin(req, resp, next) {
		if(req.user.isAdmin) {
			return next();
		}

		resp.send(500, 'User does not have proper privileges');
	}

	// This is an unstyled test page used for testing.
	function addNewPostPage(req, resp) {
		resp.render('posts/new', req.model);
	}

	// Helper Page for testing
	app.get('/posts/new', addNewPostPage);

	// Page related Routes
	app.get('/page-posts', getUsers, getVotes, returnAllPosts);
	app.get('/page-posts/:pageId', getUsers, getVotes, returnPostsByPageId);

	// Post Routes
	app.post('/posts', validateUser, addNewPost);
	app.get('/posts', getUsers, getVotes, returnAllPosts);
	app.get('/posts/:postId', getUsers, returnPostById);
	app.post('/posts/:postId', validateUser, isAdmin, updatePostById);
	app.delete('/posts/:postId', removePostById);

	// Votes Routes
	app.post('/votes', validateUser, addVote);
	app.get('/votes', getVotes, returnAllVotes);
	app.get('/votes/:postId', getVotes, returnVotesByPostId);
};