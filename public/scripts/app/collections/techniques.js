define(['backbone', 'app/models/technique'], function(Backbone, TechniqueModel){
	var TechniqueCollection = Backbone.Collection.extend({
		initialize: function() {

		},
		model: TechniqueModel,
		parse: function(resp) {
			return resp;
		}
	});

	return TechniqueCollection;
});