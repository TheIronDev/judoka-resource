define(['backbone'], function(Backbone){

	/**
	 * The Vote model, primarily used as a child model of the post model
	 */
	var Vote = Backbone.Model.extend({
		initialize: function() {
			this.listenTo(this, 'change:score', this.updateScoreClass);
		},
		updateScoreClass: function(){
			var score = this.get('userVote'),
				scoreClass = (score >= 0 ? 'up' : 'down');

			this.trigger('updateScoreClass', scoreClass, this.get('score'));
		},
		urlRoot: '/votes/',
		parse: function(resp) {
			var votes = {
				score: resp.votes,
				userVote: resp.userVote
			};
			return votes;
		},
		defaults: {
			'postId': '',
			'score': 0,
			'total': 0
		}
	});

	return Vote;
});