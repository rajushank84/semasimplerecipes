define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/landing'
	], 
	function($, _, Backbone, template){
	
		var View = Backbone.View.extend({
		
			el: '#landing',
		
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
