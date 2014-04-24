define(['backbone', 'app/views/techniquesList'], function(Backbone, TechniquesView){
	var Router = Backbone.Router.extend({
		initialize: function(options) {
			this.start();
		},
		routes: {
			"": "index",
			"techniques": "techniques",
			"techniques/group/:techniqueGroup": "techniquesGroup"
		},
		index: function(){

		},
		techniques: function() {
			if(!this.techniquesView){
				this.techniquesView = new TechniquesView({'router': this});
			}
		},
		techniquesGroup: function(techniqueGroup) {
			if(!this.techniquesView){
				this.techniquesView = new TechniquesView({'router': this});
			}
			this.techniquesView.clickInput(techniqueGroup);
		},
		start: function() {
			Backbone.history.start({pushState: true});
		}
	});

	return Router;
});