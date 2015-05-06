define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/shareRecipe'
	], 
	function($, _, Backbone, template){
	
		var View = Backbone.View.extend({
		
			el: '#shareRecipe',
		
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
