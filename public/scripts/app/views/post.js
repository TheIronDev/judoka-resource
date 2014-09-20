define(['backbone', 'app/models/vote'], function(Backbone, VoteModel){

	/**
	 *	PostView - Handles display of posts
	 * 	(as well as delegating event handling)
	 */
	var PostView = Backbone.View.extend({

		tagName: "article",
		className: "post",
		savePostTemplate: '#savedPostTemplate',
		initialize: function(opts) {
			this.template = opts.template || '#postTemplate';
			this.voteModel = new VoteModel({
				'postId': this.model.get('id')
			});
			this.listenTo(this.model, 'sync', this.savedModel);
			this.listenTo(this.model, 'error', this.handleError);
			this.listenTo(this.voteModel, 'updateScoreClass', this.updateVote);

			// Update toggle change
			this.listenTo(this.model, 'change:type', this.toggleType);
		},
		events: {
			'click .submitNewPost': 'submitNewPost',
			'click .vote': 'vote',
			'click input[type=radio]': 'updateRadio',
			'focus input[type=text]': 'focusInputs'
		},
		render: function() {
			var attr = this.model.toJSON();

			// TODO: Clean this up.
			attr.title = attr.title || 'No Title';
			attr.userId = attr.userId || 0;

			if(attr.userVote > 0) {
				attr.userVoteClass = 'up';
			} else if(attr.userVote < 0) {
				attr.userVoteClass = 'down';
			}

			this.$el.html(_.template($(this.template).html(), attr));
			this.model.set({'type': 'youtube'});
			return this.el;
		},
		submitNewPost: function(event) {
			event.preventDefault();
			this.$('.new-post-error').text('');

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
		savedModel: function(model) {
			this.$el.html(_.template($(this.savePostTemplate).html()));
			Backbone.trigger('addNewModel');
		},
		handleError: function(model, response) {
			this.$el.addClass('hasError');
			this.$('.new-post-error').text(response.responseText);
		},
		focusInputs: function() {
			this.$el.removeClass('hasError');
		},
		updateRadio: function(event) {
			var $radio = $(event.currentTarget);
			this.model.set('type', $radio.val());
		},
		toggleType: function() {
			var type = this.model.get('type'),
				$helperText = this.$('.url-text'),
				placeholder = $helperText.data(type) || '';

			$helperText.text(placeholder);
		},
		vote: function(event) {

			var score = parseInt(event.currentTarget.dataset.score, 10);
			this.voteModel.set({
				'score': score,
				'userVote': score
			});
			this.voteModel.save();
		},
		updateVote: function(scoreClass, score) {
			if (score > 0) {
				score = '+ ' + score;
			}

			var self = this,
				fade = 500;
			this.$('.scoreValue').fadeOut(fade, function() {
				self.$('.scoreValue').text(score).fadeIn(fade);
			});

			this.$('.voteWrapper').removeClass('down')
				.removeClass('up')
				.addClass(scoreClass);
		}
	});

	return PostView;
});