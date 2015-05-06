define([
  'jquery',
  'underscore', 
  'backbone'
  ], function($, _, Backbone){
  var AppView = Backbone.View.extend({

    el: $('body'),

    events: {
	    'submit form.proceed': 'proceedForm',
	    'click input.submit': 'proceedForm',
	   	'click a.proceed': 'proceedLink',
	   	'blur textarea': 'textareaBlur'
    },

    initialize: function() {
    	// FIXME: This is an ugly hack to decode HTML when the user hits the view recipe page is triggered.
 		if($('#viewRecipe #method')) {
			var encoded =  $('#viewRecipe #method').html(),
				decoded = $('<textarea/>').html(encoded).val();
				$("#viewRecipe #method").html(decoded);				
  		}
    },

    render: function() {
		// refresh the thumbnails. this is necessary because the creation of the thumbnail isnt fully finished
		// before the page loads with the img tag for the thumbnail
		// FIXME: Find a better place to put this or a better way to do this
		var $thumbnails=$('.thumbnail')

		for(var i in $thumbnails) {
		    $thumbnails[i].src = $thumbnails[i].src;
		}	    	

		// quick and easy for now
		$('.brand.proceed').click();
    },
    
    proceedForm: function(e) {
		document.getElementById("content").innerHTML = "<h2>Loading...</h2>";
		$.post(e.target.action,	$(e.target).serialize(), function(json){
			showPage(json, Backbone);
		});

	    e.preventDefault();
    },
    
    proceedLink: function(e) {
    	getPage(e.target.href, Backbone);
	    e.preventDefault();
    },


    textareaBlur: function(e) {
    	var currentElement = e.target,
    		hiddenElement = $.find("#" + currentElement.id.substring(0,currentElement.id.indexOf("Input"))),
    		modifiedValue = '';

		if(hiddenElement) {
			modifiedValue = currentElement.value.replace(/\n/g,'&&');
			$(hiddenElement).val(modifiedValue);
		}
    }

  });
  
  return AppView;
  
});


// FIXME: Find a better place to put this
function showPage(json, backbone) {
    require(['views/' + json.viewName, 'views/recipeLinks'], function(View, RecipeLinksView){
    	var pageView = new View(json),
    		linksView = new RecipeLinksView;
		
		dust.render('public/templates/' + json.viewName + '.dust', json, function(err, out) {
			document.getElementById("content").innerHTML = out;
		});
    	pageView.render(json);

		dust.render('public/templates/recipeLinks.dust', json, function(err, out) {
			document.getElementById("recipeLinks").innerHTML = out;
		});
    	linksView.render(json);
    });  
	if(json.viewName == 'landing') {
		backbone.history.navigate("#landing");
	} 
	else if (json.viewName == 'viewRecipe') {
		backbone.history.navigate("#viewRecipe/id/" + json.data.recipe._id);	
	}
	else {
		backbone.history.navigate('#' + json.viewName);			
	}
}

// FIXME: Find a better place to put this
function getPage(url, backbone) {
	document.getElementById("content").innerHTML = "<h2>Loading...<h2>";
	$.get(url, function(json){
		showPage(json, backbone);
	});
}