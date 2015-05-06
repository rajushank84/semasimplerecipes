define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/viewRecipe'
	], 
	function($, _, Backbone, template){
	
		var View = Backbone.View.extend({
		
			el: '#viewRecipe',
		
			events: {
			},
			
			initialize: function(json) {
			},
			
			render: function(json) {
				var encoded =  $('#viewRecipe #method').html(),
					decoded = $('<textarea/>').html(encoded).val();

				$("#viewRecipe #method").html(decoded);
			}
		
		});
		
		return View;
	
	}
);
