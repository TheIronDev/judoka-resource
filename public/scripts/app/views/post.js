define(['backbone', 'app/models/vote'], function(Backbone, VoteModel){

	/**
	 *	PostView - Handles display of posts
	 * 	(as well as delegating event handling)
	 */
	var PostView = Backbone.View.extend({

		tagName: "article",
		className: "post",
		initialize: function(opts) {
			this.template = opts.template || '#postTemplate';
			this.voteModel = new VoteModel({
				'postId': this.model.get('id')
			});
			this.listenTo(this.model, 'error', this.handleError);
			this.listenTo(this.voteModel, 'updateScoreClass', this.updateScoreClass);
		},
		events: {
			'click .submitNewPost': 'submitNewPost',
			'click .vote': 'vote',
			'focus input[type=text]': 'focusInputs'
		},
		render: function() {
			var attr = this.model.toJSON();

			// TODO: Clean this up.
			attr.title = attr.title || 'No Title';
			attr.userId = attr.userId || 0;

			if(attr.userVote == 1) {
				attr.userVoteClass = 'up'
			} else if(attr.userVote == -1) {
				attr.userVoteClass = 'down'
			}

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
		},
		handleError: function(model) {
			this.$el.addClass('hasError');
		},
		focusInputs: function() {
			this.$el.removeClass('hasError');
		},
		vote: function(event) {

			var score = parseInt(event.currentTarget.dataset.score, 10);
			this.voteModel.set({'score': score});
			this.voteModel.save();
		},
		updateScoreClass: function(scoreClass) {

			this.$('.voteWrapper').removeClass('down')
				.removeClass('up')
				.addClass(scoreClass);
		}
	});

	return PostView;
});