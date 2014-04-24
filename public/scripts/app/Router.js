define(['backbone', 'app/views/techniquesList'], function(Backbone, TechniquesView){
	var Router = Backbone.Router.extend({
		initialize: function(options) {
			this.start();
		},
		routes: {
			"": "index",
			"techniques": "techniques",
			"techniques/:techniquePath": "techniquePage",
			"techniques/group/:techniqueGroup": "techniquesGroup"
		},
		index: function(){

		},
		techniques: function() {
			if(!this.techniquesView){
				this.techniquesView = new TechniquesView({'router': this});
			}
			this.techniquesView.clickInput('all');
			this.techniquesView.toggleViewType('');
		},
		techniquesGroup: function(techniqueGroup) {
			if(!this.techniquesView){
				this.techniquesView = new TechniquesView({'router': this});
			}
			this.techniquesView.clickInput(techniqueGroup);
			this.techniquesView.toggleViewType('');
		},
		techniquePage: function(techniquePath) {
			if(!this.techniquesView){
				this.techniquesView = new TechniquesView({'router': this});
			}
			this.techniquesView.renderPage(techniquePath);
			this.techniquesView.toggleViewType('page');
		},
		start: function() {
			Backbone.history.start({pushState: true});
		}
	});

	return Router;
});