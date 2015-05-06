define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/about'
	], 
	function($, _, Backbone, template){
	
		var View = Backbone.View.extend({
		
			el: '#about',
		
			events: {
			},
			
			initialize: function(json) {
			},
			
			render: function(json) {
			}
		
		});
		
		return View;
	
	}
);
