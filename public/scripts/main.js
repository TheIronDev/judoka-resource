require.config({
	baseUrl: '/scripts/',
	paths: {
		jquery: 'vendor/jquery-1.11.0.min',
		backbone: 'vendor/backbone-min',
		underscore: 'vendor/underscore-min',
		lightbox: 'vendor/lightbox.min'
	},
	shim: {
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		lightbox: {
			deps: ["jquery"]
		}
	}
});

require(['jquery', 'backbone', 'underscore', 'app/Router', 'lightbox'], function($, Backbone, _, Router){

	_.templateSettings = {
		evaluate : /\{\[([\s\S]+?)\]\}/g,
		interpolate : /\{\{([\s\S]+?)\}\}/g
	};

	$(document).ready(function(){
		router = new Router();
	});
});