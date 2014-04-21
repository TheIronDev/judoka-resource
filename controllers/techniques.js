module.exports = function(app){

	var techniquesJson = require('../data/techniques.json'),
		techniqueGroups = 'Nage-Waza|Katame-Waza|Ashi-Waza|Koshi-Waza|Te-Waza|Yoko-sutemi|Ma-sutemi|' +
			'Osaekomi-Waza|Shimewaza|Kinshi-Waza|Kansetsu-Waza';

	function techniquesPage(req, resp) {
		resp.render('techniques/index', {
			techniquesJson: JSON.stringify(techniquesJson),
			titleOverride: '',
			allTechniquesClass: 'selectedLabel'
		});
	}

	function techniquesGroupPage(req, resp) {
		resp.render('techniques/index', {
			techniquesJson: JSON.stringify(techniquesJson),
			titleOverride: req.param('techniqueGroup'),
			allTechniquesClass: ''
		});
	}

	function redirectToTransferPage(req, resp) {
		resp.redirect('/techniques');
	}

	app.get('/techniques', techniquesPage);
	app.get('/techniques/:techniqueGroup('+techniqueGroups+')', techniquesGroupPage);

	// In the event the url is a non-specified technique group, we go back to rendering the default page
	app.get('/techniques/:techniqueGroup', redirectToTransferPage);

};