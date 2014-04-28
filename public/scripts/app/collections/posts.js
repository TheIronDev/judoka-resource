define(['backbone', 'app/models/post'], function(Backbone, PostModel){
	
	var PostList = Backbone.Collection.extend({
		initialize: function() {
		},
		model: PostModel,		
		parse: function(resp) {
			return resp;
		}
	});

	return PostList;
});