define(['backbone'], function(Backbone){

	/**
	 *	PostView - Handles display of posts
	 * 	(as well as delegating event handling)
	 */
	var PostView = Backbone.View.extend({

		el: '.post',
		initialize: function(opts) {
			this.template = opts.template || '#postTemplate';
			// TODO: Map events
		},
		events: {
			'click .submitNewPost': 'submitNewPost'
		},
		render: function() {
			var attr = this.model.toJSON();
			return _.template($(this.template).html(), attr);
		},
		submitNewPost: function(event) {
			alert('aaa');
			event.preventDefault();

			// Submit the new post
			this.model.set('title', 'test title');

			// TODO: Remove me. :)
			this.model.set('userId', 1);

			// Upon success we should emit an add event that the collectionView listens to.
			this.model.save();

			return false;
		}
	});

	return PostView;
});