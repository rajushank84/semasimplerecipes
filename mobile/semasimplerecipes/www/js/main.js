require.config({
	paths: {
		jquery: 'lib/jquery-min',
		underscore: 'lib/underscore-min',
		backbone: 'lib/backbone-optamd3-min'
	}
});


require(['views/app','backbone'], function(AppView, Backbone){
	var appView =  new AppView;
	appView.render();

	var AppRouter = Backbone.Router.extend({
		routes: {
			'viewRecipe/id/:id': 'viewRecipe',
			'shareRecipe': 'shareRecipe',
			'landing': 'landing',
			'about': 'about',
			'': 'default'
		},

		viewRecipe: function(id) {
			getPage('/viewRecipe?id=' + id, Backbone);
		},

		shareRecipe: function(id) {
			getPage('/shareRecipe', Backbone);
		},

		about: function() {
			getPage('/about', Backbone);
		},

		landing: function() {
			getPage('/', Backbone);
		},

		default: function() {
			var url,beg,end,id;

			// this is to handle old URLs that google indexed before i added routes support
			// putting this here for now. figure out a better way to do this later.
			url = window.location.href;
			beg = url.indexOf("/viewRecipe?id=");
			if(beg === -1) {
				//getPage('/', Backbone);
				Backbone.history.navigate('#landing');			

			}
			else {
				beg = beg + 15;
				end = url.indexOf("#");
				if(end === -1) {
					end = url.length;
				}
				id = url.substring(beg, end);
				//Backbone.history.navigate("#viewRecipe/id/" + id);	

				//getPage('/viewRecipe?id=' + id, Backbone);
			}
		}
	});

	var appRouter = new AppRouter();
	Backbone.history.start();

}); 


require([
	'../jsdust/viewRecipe',
	'views/viewRecipe',
	'../jsdust/recipeLinks',
	'views/recipeLinks',
	'../jsdust/shareRecipe',
	'views/shareRecipe',
	'../jsdust/landing',
	'views/landing',
	'../jsdust/about',
	'views/about',
	], function(){
		// do nothing.
});

