define(['backbone'], function(Backbone){

	/**
	 *	PostView - Handles display of posts
	 * 	(as well as delegating event handling)
	 */
	var PostView = Backbone.View.extend({

		tagName: "article",
		className: "post",
		initialize: function(opts) {
			this.template = opts.template || '#postTemplate';
			// TODO: Map events
		},
		events: {
			'click': 'submitNewPost'
		},
		render: function() {
			var attr = this.model.toJSON();

			// TODO: Clean this up.
			attr.title = attr.title || '&nbsp;';
			attr.userId = attr.userId || 0;

			this.$el.html(_.template($(this.template).html(), attr));
			return this.el;
		},
		submitNewPost: function(event) {
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