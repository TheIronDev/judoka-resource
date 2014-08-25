define(['backbone', 'app/views/techniquesList', 'app/views/page', 'app/views/admin', 'app/models/page'],
	function(Backbone, TechniquesView, PageView, AdminView, PageModel){
	var Router = Backbone.Router.extend({
		initialize: function(options) {
			this.adminView = new AdminView();
			this.start();
		},
		routes: {
			"": "index",
			"techniques": "techniques",
			"techniques/": "techniques",
			"techniques/:techniquePath": "techniquePage",
			"resources/:page": "page",
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
		page: function(techniquePath) {

			// Hacky Cheat
			var modelAttrs = $('.page').data('pagejson');

			if(!this.pageView){
				this.pageModel = new PageModel(modelAttrs);
				this.pageView= new PageView({
					'router': this,
					'model': this.pageModel
				});
			}
			this.pageView.render();
		},
		start: function() {
			Backbone.history.start({pushState: true});
		}
	});

	return Router;
});