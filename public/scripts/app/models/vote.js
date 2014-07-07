define(['backbone'], function(Backbone){

	/**
	 * The Vote model, primarily used as a child model of the post model
	 */
	var Vote = Backbone.Model.extend({
		initialize: function() {
			this.listenTo(this, 'change:score', this.updateScoreClass);
		},
		updateScoreClass: function(){
			var score = this.get('score'),
				scoreClass = '';

			scoreClass = (score >= 0 ? 'up' : 'down');
			this.trigger('updateScoreClass', scoreClass);
		},
		urlRoot: '/votes/',
		parse: function(resp) {
			return resp.vote;
		},
		defaults: {
			'postId': '',
			'score': 0
		}
	});

	return Vote;
});