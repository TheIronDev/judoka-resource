define(['backbone', 'app/collections/posts', 'app/models/post', 'app/views/post'],
	function(Backbone, PostList, PostModel, PostView, NewPostView){

	var PostListView = Backbone.View.extend({
		el: '.post-list',
		initialize: function(opts) {
			this.pageId = opts.pageId;
			this.$el.html('');
		},
		render: function() {
			this.$el.html('');
			// TODO: sort collection by score.
			this.collection.each(function(post){
				var postView = new PostView({model:post});
				this.$el.append(postView.render());
			}, this);

			// Create a new Post
			var newPost = new PostModel({pageId: this.pageId});
			var postView = new PostView({
				model: newPost,
				template: '#newPostTemplate'
			});
			this.$el.append(postView.render());

			return this.$el
		}
	});

	return PostListView;
});