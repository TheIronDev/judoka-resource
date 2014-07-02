module.exports = function(app, models){

	// Working with a dummy JSON to get the front end rolling.
	var dummyPosts = require('../data/dummyPosts'),
		PostModel = models.PostModel;

	// Return alll the posts!
	function returnAllPosts(req, resp) {

		PostModel.find(function (err, posts) {
			if (err) return console.error(err);
			resp.json({posts: posts});
		});
	}

	// Return posts by pageId
	function returnPostsByPageId(req, resp) {

		var pageId = req.param('pageId');
		PostModel.find({'pageId': pageId}, function(err, posts) {
			if(err) return console.error(err);
			resp.json({posts: posts});
		})
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
		var payload = req.body,
			newPost = new PostModel(payload);

		newPost.updateUrl(function() {
			newPost.save();
			resp.json({posts: newPost});
		});
	}

	// Update a post's details
	function updatePostById(req, resp) {

		// TODO: this
		var postId = req.param('postId');
		resp.json({posts: dummyPosts});
	}

	// Remove a post from the database
	function removePostById(req, resp) {
		var postId = req.param('postId');
		PostModel.findById(postId, function(err, post){
			if(err) return console.error(err);
			resp.json({posts: dummyPosts});
			post.remove()
		});
	}

	// This is an unstyled test page used for testing.
	function addNewPostPage(req, resp) {
		resp.render('posts/new', {});
	}

	// Middleware approach to populate the user to the model
	function addUserToReq(req, resp, next) {

		req.body.userId = 1;
		next();
	}


	// Helper Page for testing
	app.get('/posts/new', addNewPostPage);

	// Page related Routes
	app.get('/page-posts', returnAllPosts);
	app.get('/page-posts/:pageId', returnPostsByPageId);

	// Post Routes
	app.post('/posts', addUserToReq, addNewPost);
	app.get('/posts', returnAllPosts);
	app.get('/posts/:postId', returnPostById);
	app.put('/posts/:postId', updatePostById);
	app.delete('/posts/:postId', removePostById);
};