module.exports = function(app){

	function returnAllPosts(req, resp) {
		// For now, return an empty json, we'll figure this out later...
		resp.json({posts: {}});
	}

	function returnPostsByPageId(req, resp) {

		var pageId = req.param('pageId');
		// For now, return an empty json, we'll figure this out later...
		resp.json({posts: {}});
	}

	app.get('/posts', returnAllPosts);	
	app.get('/posts/:pageId', returnPostsByPageId);	
};