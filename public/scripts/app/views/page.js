define(['backbone', 'app/collections/posts', 'app/views/postList'], function(Backbone, PostList, PostListView){

	var PageView = Backbone.View.extend({
		el: '.page',
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.model.fetch();
		},
		render: function() {

			this.$el.html('');

			var attr = this.model.toJSON(),
				renderedContent = _.template($('#pageTemplate').html(), attr);

			this.$el.html(renderedContent);
			this.$el.append('<div class="post-list"></div>');

			this.collection = new PostList(attr.posts);
			this.collectionView = new PostListView({
				collection: this.collection,
				pageId: attr.pageId,
				userVotes: attr.userVotes
			});
			this.$el.append(this.collectionView.render());
		}
	});

	return PageView;
});