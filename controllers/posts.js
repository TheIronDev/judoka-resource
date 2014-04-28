module.exports = function(app){

	// Working with a dummy JSON to get the front end rolling.
	var dummyPosts = require('../data/dummyPosts');

	function returnAllPosts(req, resp) {
		resp.json({posts: dummyPosts});
	}

	function returnPostsByPageId(req, resp) {

		var pageId = req.param('pageId');
		resp.json({posts: dummyPosts});
	}

	app.get('/page-posts', returnAllPosts);
	app.get('/page-posts/:pageId', returnPostsByPageId);

	// TODO: handle post crud operations
	// app.get('/post/:postId', returnPostById);
	// app.post('/post', addNewPost);
	// app.put('/post/:postId', updatePostById);
	// app.delete('/post/:postId', removePostById);
};