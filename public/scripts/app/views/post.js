define(['backbone'], function(Backbone){

	/**
	 *	PostView - Handles display of posts
	 * 	(as well as delegating event handling)
	 */
	var PostView = Backbone.View.extend({

		el: '.post',
		initialize: function() {
			// TODO: Map events
		},
		events: {

		},
		render: function() {
			var attr = this.model.toJSON();
			return _.template($('#postTemplate').html(), attr);
		}
	});

	return PostView;
});