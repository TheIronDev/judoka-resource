module.exports = function(app){

	var techniquesJson = require('../data/techniques.json'),
		_ = require('underscore'),
		techniqueGroups = 'Nage-Waza|Katame-Waza|Ashi-Waza|Koshi-Waza|Te-Waza|Yoko-sutemi|Ma-sutemi|' +
			'Osaekomi-Waza|Shimewaza|Kinshi-Waza|Kansetsu-Waza';

	// Page - /techniques
	function techniquesPage(req, resp) {
		resp.render('techniques/index', _.extend(req.model, {
			techniquesJson: JSON.stringify(techniquesJson),
			techniquesArray: _.toArray(techniquesJson),
			titleOverride: '',
			allTechniquesClass: 'selectedLabel'
		}));
	}

	// Page - /techniques/:id
	function techniquePage(req, resp) {

		resp.render('techniques/index', _.extend(req.model, {
			techniquesJson: JSON.stringify(techniquesJson),
			techniquesArray: [],
			titleOverride: req.param('techniqueName'),
			allTechniquesClass: ''
		}));
	}

	// Page - /techniques/group/:id
	function techniquesGroupPage(req, resp) {

		var techniqueGroup = req.param('techniqueGroup'),
			filteredList;
		if (techniqueGroup === 'Nage-Waza' || techniqueGroup === 'Katame-Waza') {
			filteredList = _.where(techniquesJson, {'type': techniqueGroup});
		} else {
			filteredList = _.where(techniquesJson, {'subtype': techniqueGroup});
		}

		resp.render('techniques/index', _.extend(req.model, {
			techniquesJson: JSON.stringify(techniquesJson),
			techniquesArray: filteredList,
			titleOverride: techniqueGroup + ' Techniques',
			allTechniquesClass: ''
		}));
	}

	function redirectToTransferPage(req, resp) {
		resp.redirect('/techniques');
	}

	app.get('/', techniquesPage);
	app.get('/techniques', techniquesPage);
	app.get('/techniques/:techniqueName', techniquePage);

	app.get('/techniques/group/:techniqueGroup('+techniqueGroups+')', techniquesGroupPage);

	// In the event the url is a non-specified technique group, we go back to rendering the default page
	app.get('/techniques/group/:techniqueGroup', redirectToTransferPage);

};