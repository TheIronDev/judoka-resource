module.exports = function(app, models){

	// Working with a dummy JSON to get the front end rolling.
	var dummyPosts = require('../data/dummyPosts'),
		PostModel = models.PostModel;

	function returnAllPosts(req, resp) {

		PostModel.find(function (err, posts) {
			if (err) return console.error(err);

			console.log(posts);
			resp.json({posts: dummyPosts});
		});
	}

	function returnPostsByPageId(req, resp) {

		var pageId = req.param('pageId');
		resp.json({posts: dummyPosts});
	}

	function returnPostById(req, resp) {

		var postId = req.param('postId');
		resp.json({posts: dummyPosts});
	}

	// Create a new post
	function addNewPost(req, resp) {
		var payload = req.body,
			newPost = new PostModel(payload);

		// TODO: Validation.
		newPost.save();
		resp.json({posts: dummyPosts});
	}

	function updatePostById(req, resp) {

		var postId = req.param('postId');
		resp.json({posts: dummyPosts});
	}

	function removePostById(req, resp) {
		var postId = req.param('postId');
		resp.json({posts: dummyPosts});
	}

	function addNewPostPage(req, resp) {
		resp.render('posts/new', {});
	}

	// Helper Page for testing
	app.get('/posts/new', addNewPostPage);
	// TODO: Remove this route.

	// Page related Routes
	app.get('/page-posts', returnAllPosts);
	app.get('/page-posts/:pageId', returnPostsByPageId);

	// Post Routes
	app.post('/posts', addNewPost);
	app.get('/posts', returnAllPosts);
	app.get('/posts/:postId', returnPostById);
	app.put('/posts/:postId', updatePostById);
	app.delete('/posts/:postId', removePostById);
};