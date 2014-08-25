/**
 * Cheaty helper for all admin functionality.
 */
define(['jquery', 'backbone', 'app/models/admin'], function($, Backbone, AdminModel){

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
				callbackName = elData.callback,
				data = elData.data || {},
				adminView = this;

			this.model.fetch({
				'method': method,
				'url': url,
				'data': data,
				'success': function() {
					adminView.callbacks[callbackName].call(adminView, event);
				}
			});
		},
		callbacks: {
			'removeParent': function(event) {
				var $target = $(event.currentTarget),
					$parent = $target.parent();
				$parent.fadeOut();
			}
		}
	});

	return AdminView;
});