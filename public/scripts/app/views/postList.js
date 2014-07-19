define(['backbone', 'app/collections/posts', 'app/models/post', 'app/views/post'],
	function(Backbone, PostList, PostModel, PostView, NewPostView){

	var PostListView = Backbone.View.extend({
		el: '.post-list',
		initialize: function(opts) {
			this.pageId = opts.pageId;
			this.userVotes = opts.userVotes;
			this.$el.html('');
		},
		render: function() {

			this.$el.html('');

			_.each(this.collection.sortBy('score').reverse(), function(post){

				// Only display Approved Posts
				if (post.get('approved')) {

					var userVote = this.userVotes[post.get('id')];
					if (userVote) {
						post.set('userVote', userVote);
					}

					var postView = new PostView({model:post});
					this.$el.append(postView.render());
				}
			}, this);

			this.addNewPost();

			return this.$el;
		},
		addNewPost: function() {

			// Create a new Post
			var newPost = new PostModel({pageId: this.pageId});
			var postView = new PostView({
				model: newPost,
				template: '#newPostTemplate'
			});
			this.listenToOnce(Backbone, 'addNewModel', this.addNewPost);
			this.$el.append(postView.render());
		}
	});

	return PostListView;
});