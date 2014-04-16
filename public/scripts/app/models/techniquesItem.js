define(['backbone'], function(Backbone){
	var TechniquesItem = Backbone.Model.extend({
		initialize: function() {
		},
		parse: function(resp) {
			return resp;
		},
		defaults: {
			'name': '',
			'type': '',
			'path': '',
			'subtype': '',
			'description': ''
		}
	});

	return TechniquesItem;
});