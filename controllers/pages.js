module.exports = function(app){

	var pageJson = require('../data/pages.json'),
		_ = require('underscore');

	function renderPage(req, resp) {

		var page = req.model.page;
		resp.render('pages/index', _.extend(req.model, {
			pageJson: JSON.stringify(page),
			title: page.name
		}));
	}

	function findPage(req, resp, next) {
		var pageName = req.param('pageName'),
			page = _.findWhere(pageJson, {
				'path': pageName
			});
		if(!page) {
			return resp.send(400, 'Page not found');
		}

		req.model.page = page;
		next();
	}

	app.get('/resources/:pageName', findPage, renderPage);

};