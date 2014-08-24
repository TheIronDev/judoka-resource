define(['backbone', 'app/collections/techniques', 'app/views/techniquesItem', 'app/views/page'],
	function(Backbone, TechniquesCollection, TechniqueItemView, PageView){

	var TechniquesView = Backbone.View.extend({

		el: '.techniques-container',
		events: {
			'change input[name=group]': 'sortByGroup',
			'change input[name=subgroup]': 'sortBySubGroup',
			'change select': 'sortByDropdownSelection',
			'click .technique-item': 'navigateToPage'
		},
		initialize: function(options) {
			// Reference Parent router
			this.router = options.router;

			// Maintains "state' of if we need to update the title.
			// TODO: revisit if this is necessary..
			this.shouldResetH1 = false;

			// Canvas where we will redraw judo techniques
			this.techniqueList = this.$('.technique-list');

			// Init a collection, and render all if needed.
			this.collection = new TechniquesCollection();
			this.listenToOnce(this.collection, 'reset', this.renderAll); // TODO: Move me to the router?
			this.collection.reset(this.techniqueList.data('techniques'));
		},
		/**
		 * Dirty Hack to handle initial load of /techniques/group/:pages (router function)
		 * @param inputValue
		 */
		clickInput: function(inputValue) {
			var $selectedInput = this.$('input[value='+inputValue+']');

			if($selectedInput) {
				$selectedInput.click();
			}
		},
		/**
		 * Helper navigation method that calls on the parent router
		 * @param page
		 */
		navigateTo: function(page) {
			this.router.navigate('/techniques'+page, true);
		},
		/**
		 * Handle the Click event on a techniqueItem
		 * @param event
		 */
		navigateToPage: function(event){
			var $page = $(event.currentTarget),
				techniquePath = $page.data('path');

			this.navigateTo('/'+techniquePath);
		},
		/**
		 * Render an individual technique on the technique list
		 * @param techniqueModel
		 */
		renderOne: function(techniqueModel) {
			var techniqueItemView = new TechniqueItemView({
				model:techniqueModel
			});
			techniqueHtml = techniqueItemView.render();

			this.techniqueList.append(techniqueHtml);
		},
		/**
		 * Render a group of techniques
		 * @param group - A Set (or subset) of collection.models
		 */
		renderGroup: function(group) {
			this.$('.technique-list').html('');
			_.each(group, function(techniqueModel){
				this.renderOne(techniqueModel);
			}, this);
		},
		/**
		 * Display All Techniques
		 */
		renderAll: function() {
			this.renderGroup(this.collection.models);
		},
		/**
		 * Display / Hide the List or Page experience
		 * @param viewType
		 */
		toggleViewType: function(viewType) {
			if(viewType === "page") {
				this.$('.technique-list').hide();
				this.$('.technique-groups').hide();
				this.$('.page').show();
			} else {
				this.$('.technique-list').show();
				this.$('.technique-groups').show();
				this.$('.page').hide();
			}
		},
		/**
		 * Render an individual technique page
		 *  (i.e: /techniques/seio-nage
		 * @param event
		 */
		renderPage: function(path) {
			// TODO: Get a techniqueView, pass in the current technique model, and bind it to .page
			var pageModel = this.collection.findWhere({'path': path}),
				pageView = new PageView({model: pageModel});

			this.updateTitle(pageModel.get('name'));
		},
		/**
		 * Sort Technique List by Group (All/ Tachi-Waza, Katame-Waza), passing in the sorted list to renderGroup
		 * @param event
		 */
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
		/**
		 * Sort Technique List by subGroup (Ashi-waza, Osaekomi), passing in the sorted list to renderGroup
		 * @param event
		 */
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
		/**
		 * Helper function to update the Technique Radio Inputs
		 * @param $selectedGroup    -   Which Group are we updating
		 * @param $selectedLabel    -   Which Label should we apply styling
		 * @param newTitle          -   What should the new title be.
		 */
		updateSelectionUI: function($selectedGroup, $selectedLabel, newTitle){
			// Reset UI
			this.$('label').removeClass('selectedLabel');
			$selectedGroup.removeAttr('checked');

			// Update the selected Label, and the title (if necessary)
			$selectedLabel.className += " selectedLabel";
			this.updateTitle(newTitle);
		},
		/**
		 * Helper function to provide a consistent way of updating our title.
		 * @param newTitle
		 */
		updateTitle: function(newTitle) {
			if(this.shouldResetH1) {
				$('h1').fadeOut(400, function(){
					$('h1').text(newTitle).fadeIn();
				});
			}
			this.shouldResetH1 = true;
		},
		/**
		 * When the user changes the dropdown, update the selected technique.
		 * TODO: Refactor this and the other two functions, there is a large amount of redundancy.
		 * @param event
		 */
		sortByDropdownSelection: function(event) {
			var $dropdown = $(event.currentTarget),
				$selectedOption = $dropdown.find('option:selected'),
				selectedValue = $dropdown.val(),
				groupType = $selectedOption.data('type'),
				newTitle = $selectedOption.data('title'),
				groupedBy;

			if (groupType === "subtype") {
				groupedBy = this.collection.where({'subtype': selectedValue});
				this.navigateTo('/group/'+selectedValue);
			} else if (groupType === 'type') {
				groupedBy = this.collection.where({'type': selectedValue});
				this.navigateTo('/group/'+selectedValue);
			} else {
				groupedBy = this.collection.models;
				this.navigateTo('/');
			}

			this.renderGroup(groupedBy);
			this.updateTitle(newTitle);
		}
	});

	return TechniquesView;
});