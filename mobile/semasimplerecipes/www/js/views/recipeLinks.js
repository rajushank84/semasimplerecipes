define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/recipeLinks'
	], 
	function($, _, Backbone, template){
	
		var View = Backbone.View.extend({
		
			el: '#recipeLinks',
		
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
