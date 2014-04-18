module.exports = function(app){

	var techniquesJson = require('../data/techniques.json');

	function techniquesPage(req, resp) {
		resp.render('techniques/index', {
			techniquesJson: JSON.stringify(techniquesJson),
			titleOverride: ''
		});
	}

	function techniquesGroupPage(req, resp) {
		resp.render('techniques/index', {
			techniquesJson: JSON.stringify(techniquesJson),
			titleOverride: req.param('techniqueGroup')
		});
	}

	app.get('/techniques', techniquesPage);
	app.get('/techniques/:techniqueGroup', techniquesGroupPage);
};