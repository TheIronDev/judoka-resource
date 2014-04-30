define(['backbone'], function(Backbone){

	var TechniquesItemView = Backbone.View.extend({

		el: '.techniques-item',
		initialize: function() {

		},
		render: function() {
			var attr = this.model.toJSON();

			return _.template($('#techniqueItem').html(), attr);
		}
	});

	return TechniquesItemView;
});