define(['backbone', 'app/models/technique'], function(Backbone, TechniquesModel){

	var TechniquePageView = Backbone.View.extend({

		el: '.technique-page',
		initialize: function() {
			this.listenTo(this.model, 'reset', this.render);
			this.model.fetch();
		},
		render: function() {
			var attr = this.model.toJSON();

			return _.template($('#techniquePage').html(), attr);
		}
	});

	return TechniquePageView;
});