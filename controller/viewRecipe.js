var RecipeModel = require('../model/RecipeModel');

module.exports = function(app) {
       
	app.get('/viewRecipe', function(req, res) {

		RecipeModel.getAllRecipes(function(allTheRecipes){
			var theRecipe;

			for(var i in allTheRecipes) {
				if(allTheRecipes[i]._id == req.query.id.toString()) {
					allTheRecipes[i].selected = "active";
					theRecipe = allTheRecipes[i];
				}
			}

			var json = {
				viewName: "viewRecipe",
				baseTemplate: 'base',
				data: {			
					recipe: theRecipe,
					allRecipes: allTheRecipes
				}
			};

			//if(req.header('X-Requested-With') == 'XMLHttpRequest') {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(json));
				res.end();
			/*}
			else {
				res.render("public/templates/" + json.baseTemplate,json);
			}*/
		});
	});

}
