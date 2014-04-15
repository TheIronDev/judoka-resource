define(['backbone', 'app/collections/techniques'], function(Backbone, TechniquesCollection){
	var TechniquesView = Backbone.View.extend({

		el: '.techniques-container',
		initialize: function(options) {
			this.techniqueList = this.$('.technique-list');
			this.collection = new TechniquesCollection();

			this.listenToOnce(this.collection, 'reset', this.render);
			this.collection.reset(this.techniqueList.data('techniques'));



			// populate collection here
		},
		render: function(subGroup) {
			//this.techniqueList.html('');
			_.each(this.collection.models, function(technique){
				var techniqueJSON = technique.toJSON();
				this.techniqueList.append('('+techniqueJSON.name+')');
			}, this);
		}
	});

	return TechniquesView;
});