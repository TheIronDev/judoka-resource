define(['backbone'], function(Backbone){
	var TechniquesItem = Backbone.Model.extend({
		initialize: function() {
			// TODO: add url, wire in a posts collection
		},
		idAttribute: 'path',
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