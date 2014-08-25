/**
 * Cheaty helper for all admin functionality.
 */
define(['backbone', 'app/models/admin'], function(Backbone, AdminModel){

	var AdminView = Backbone.View.extend({
		el: 'body',
		initialize: function() {
			this.model = new AdminModel();
		},
		events: {
			'click .admin-operation': 'handleAdminOperation'
		},
		handleAdminOperation: function(event) {
			event.preventDefault();

			// I'm going to be honest, I know this approach is a dirty hack. I'll go back and refactor some day.
			// TODO: refactor
			var elData = event.currentTarget.dataset,
				method = elData.method,
				url = elData.url,
				data = elData.data || {};

			this.model.fetch({
				'method': method,
				'url': url,
				'data': data
			});
		}
	});

	return AdminView;
});