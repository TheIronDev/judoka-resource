define(['backbone'], function(Backbone){
	var TechniqueCollection = Backbone.Collection.extend({
		initialize: function() {

		},
		parse: function(resp) {
			debugger;
			return resp;
		}
	});

	return TechniqueCollection;
});