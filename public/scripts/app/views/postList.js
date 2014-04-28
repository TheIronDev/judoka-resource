define(['backbone', 'app/collections/posts', 'app/views/post'], function(Backbone, PostList, PostView){

	var PostListView = Backbone.View.extend({
		el: '.post-list',
		initialize: function() {
			this.$el.html('');
		},
		render: function() {
			this.$el.html('');
			// TODO: sort collection by score.
			this.collection.each(function(post){
				var postView = new PostView({model:post});
				this.$el.append(postView.render());
			}, this);

			return this.$el
		}
	});

	return PostListView;
});