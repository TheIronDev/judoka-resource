define(['backbone', 'app/models/technique'], function(Backbone, TechniquesModel){

	var TechniquePageView = Backbone.View.extend({
		el: '.technique-page',
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.model.fetch();
		},
		render: function() {
			var attr = this.model.toJSON(),
				renderedContent = _.template($('#techniquePage').html(), attr);

			this.$el.html(renderedContent);
		}
	});

	return TechniquePageView;
});