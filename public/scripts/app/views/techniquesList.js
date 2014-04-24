define(['backbone', 'app/collections/techniques', 'app/models/techniquesItem', 'app/views/techniquesItem'],
	function(Backbone, TechniquesCollection, TechniqueModel, TechniqueItemView){

	var TechniquesView = Backbone.View.extend({

		el: '.techniques-container',
		events: {
			'change input[name=group]': 'sortByGroup',
			'change input[name=subgroup]': 'sortBySubGroup'
		},
		initialize: function(options) {
			// Reference Parent router
			this.router = options.router;

			this.shouldResetH1 = false;

			// Canvas where we will redraw judo techniques
			this.techniqueList = this.$('.technique-list');

			this.collection = new TechniquesCollection();

			this.listenToOnce(this.collection, 'reset', this.renderAll);
			this.collection.reset(this.techniqueList.data('techniques'));
		},
		clickInput: function(inputValue) {
			var $selectedInput = this.$('input[value='+inputValue+']');

			if($selectedInput) {
				this.shouldResetH1 = false;
				$selectedInput.click();
			}
		},
		navigateTo: function(page) {
			this.router.navigate('/techniques'+page);
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
			this.shouldResetH1 = true;
		},
		sortByGroup: function(event) {
			var type = event.currentTarget.value,
				h1Title = event.currentTarget.dataset.title,
				groupedBy = this.collection.where({'type': type}),
				$selectedGroup = this.$('input[name=subgroup]'),
				$selectedLabel = event.currentTarget.parentNode;

			this.updateSelectionUI($selectedGroup, $selectedLabel, h1Title);

			if(type === 'all') {
				this.renderAll();
				this.navigateTo('');
			} else {
				this.renderGroup(groupedBy);
				this.navigateTo('/group/'+type);
			}
		},
		sortBySubGroup: function(event) {
			var subType = event.currentTarget.value,
				h1Title = event.currentTarget.dataset.title,
				groupedBy = this.collection.where({'subtype': subType}),
				$selectedGroup = this.$('input[name=group]'),
				$selectedLabel = event.currentTarget.parentNode;

			this.updateSelectionUI($selectedGroup, $selectedLabel, h1Title);
			this.renderGroup(groupedBy);
			this.navigateTo('/group/'+subType);
		},
		updateSelectionUI: function($selectedGroup, $selectedLabel, newTitle){
			// Reset UI
			this.$('label').removeClass('selectedLabel');
			$selectedGroup.removeAttr('checked');

			// Update the selected Label, and the title (if necessary)
			$selectedLabel.className += " selectedLabel";
			this.updateTitle(newTitle);
		},
		updateTitle: function(newTitle) {
			if(this.shouldResetH1) {
				$('h1').fadeOut(400, function(){
					$('h1').text(newTitle).fadeIn();
				});
			}
			this.shouldResetH1 = true;
		}
	});

	return TechniquesView;
});