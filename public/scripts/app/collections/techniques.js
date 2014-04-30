/**
 * I considered naming the TechniqueModel "PageModel", however, contextually, we are using a "technique model"
 */
define(['backbone', 'app/models/page'], function(Backbone, TechniqueModel){
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