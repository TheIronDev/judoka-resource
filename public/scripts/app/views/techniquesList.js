define(['backbone', 'app/collections/techniques', 'app/models/techniquesItem', 'app/views/techniquesItem'],
	function(Backbone, TechniquesCollection, TechniqueModel, TechniqueItemView){

	var TechniquesView = Backbone.View.extend({

		el: '.techniques-container',
		events: {
			'change input[name=group]': 'sortByGroup',
			'change input[name=subgroup]': 'sortBySubGroup'
		},
		initialize: function(options) {
			this.techniqueList = this.$('.technique-list');
			this.collection = new TechniquesCollection();

			this.listenToOnce(this.collection, 'reset', this.renderAll);
			this.collection.reset(this.techniqueList.data('techniques'));
		},
		renderOne: function(techniqueModel) {
			var techniqueItemView = new TechniqueItemView({model:techniqueModel})
			techniqueHtml = techniqueItemView.render();

			this.techniqueList.append(techniqueHtml);
		},
		renderGroup: function(group) {
			this.$('.technique-list').html('');
			_.each(group, function(techniqueModel){
				this.renderOne(techniqueModel);
			}, this);
		},
		renderAll: function() {
			this.$('.technique-list').html('');
			this.renderGroup(this.collection.models);
		},
		sortByGroup: function(event) {
			var type = event.currentTarget.value,
				h1Title = event.currentTarget.dataset.title,
				groupedBy = this.collection.where({'type': type});

			this.updateTitle(h1Title);
			this.$('input[name=subgroup]').removeAttr('checked');

			if(type === 'all') {
				this.renderAll();
			} else {
				this.renderGroup(groupedBy);
			}
		},
		sortBySubGroup: function(event) {
			var subType = event.currentTarget.value,
				h1Title = event.currentTarget.dataset.title,
				groupedBy = this.collection.where({'subtype': subType});

			this.updateTitle(h1Title);
			this.renderGroup(groupedBy);
		},
		updateTitle: function(newTitle) {
			$('h1').fadeOut(400, function(){
				$('h1').text(newTitle).fadeIn();
			});
		}
	});

	return TechniquesView;
});