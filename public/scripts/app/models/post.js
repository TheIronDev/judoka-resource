define(['backbone'], function(Backbone){
	
	/**
	 * The Post model, which we will use for more than just posts later on
	 */
	var Post = Backbone.Model.extend({
		initialize: function() {
			
		},
		urlRoot: '/posts/',
		idAttribute: 'id',
		parse: function(resp) {
			return resp;
		},
		defaults: {
			'title': 'Default Title',
			'type': 'youtube',
			'score': 50,
			'timestamp': '',
			'approved': false
		}
	});

	return Post;
});