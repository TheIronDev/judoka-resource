define(['backbone', 'app/models/techniquesItem'], function(Backbone, TechniquesItem){

	var TechniquesItemView = Backbone.View.extend({

		el: '.techniques-item',
		initialize: function() {

		},
		render: function(subGroup) {
			var attr = this.model.toJSON();

			return _.template($('#techniqueItem').html(), attr);
		}
	});

	return TechniquesItemView;
});