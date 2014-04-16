define(['backbone', 'app/models/techniquesItem'], function(Backbone, TechniquesItem){
	var TechniqueCollection = Backbone.Collection.extend({
		initialize: function() {

		},
		model: TechniquesItem,
		parse: function(resp) {
			return resp;
		}
	});

	return TechniqueCollection;
});