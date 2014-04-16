define(['backbone', 'app/views/techniquesList'], function(Backbone, TechniquesView){
	var Router = Backbone.Router.extend({
		initialize: function(options) {
			this.start();
		},
		routes: {
			"": "index",
			"techniques": "techniques"
		},
		index: function(){
			console.log('index')
		},
		techniques: function() {
			if(!this.techniquesView){
				this.techniquesView = new TechniquesView();
			}
		},
		start: function() {
			Backbone.history.start({pushState: true});
		}
	});

	return Router;
});