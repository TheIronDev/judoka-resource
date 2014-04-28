define(['backbone', 'app/models/technique', 'app/collections/posts', 'app/views/postList'], function(Backbone, TechniquesModel, PostList, PostListView){

	var TechniquePageView = Backbone.View.extend({
		el: '.technique-page',
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.model.fetch();
		},
		render: function() {

			this.$el.html('');

			var attr = this.model.toJSON(),
				renderedContent = _.template($('#techniquePage').html(), attr);

			this.$el.html(renderedContent);
			this.$el.append('<div class="post-list"></div>');

			this.collection = new PostList(attr.posts);
			this.collectionView = new PostListView({collection: this.collection});
			this.$el.append(this.collectionView.render());
		}
	});

	return TechniquePageView;
});