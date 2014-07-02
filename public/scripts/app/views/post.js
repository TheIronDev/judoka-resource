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
			'click .submitNewPost': 'submitNewPost'
		},
		render: function() {
			var attr = this.model.toJSON();

			// TODO: Clean this up.
			attr.title = attr.title || 'No Title';
			attr.userId = attr.userId || 0;

			this.$el.html(_.template($(this.template).html(), attr));
			return this.el;
		},
		submitNewPost: function(event) {
			event.preventDefault();

			this.model.set({
				'title': this.$('input[name=title]').val(),
				'url': this.$('input[name=url]').val(),
				'type': this.$('input[name=type]:checked').val(),
				'pageId': this.$('input[name=pageId]').val(),
				'timestamp': (new Date()).toISOString()
			});

			// Upon success we should emit an add event that the collectionView listens to.
			this.model.save();
		}
	});

	return PostView;
});