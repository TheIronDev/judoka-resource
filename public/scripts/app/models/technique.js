define(['backbone'], function(Backbone){

	/**
	 * This model closer represents a "page".
	 *  Fetch returns a json list of posts.
	 */
	var TechniquesItem = Backbone.Model.extend({
		initialize: function() {
		},
		urlRoot: '/page-posts/',
		idAttribute: 'pageId',
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