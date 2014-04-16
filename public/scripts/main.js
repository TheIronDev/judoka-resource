require.config({
	baseUrl: '/scripts/',
	paths: {
		jquery: 'vendor/jquery-1.11.0.min',
		backbone: 'vendor/backbone-min',
		underscore: 'vendor/underscore-min'
	},
	shim: {
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

require(['jquery', 'backbone', 'underscore', 'app/Router'], function($, Backbone, _, Router){

	_.templateSettings = {
		interpolate: /\{\{(.+?)\}\}/g
	};

	$(document).ready(function(){
		router = new Router();
	});
});