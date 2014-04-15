module.exports = function(app){

	var techniquesJson = require('../data/techniques.json');

	function techniquesPage(req, resp) {
		resp.render('techniques/index', {
			techniquesJson: JSON.stringify(techniquesJson)
		});
	}

	app.get('/techniques', techniquesPage);
};