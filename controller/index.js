var RecipeModel = require('../model/RecipeModel');

module.exports = function(app) {
              
	app.get('/landing', function(req, res) {

		RecipeModel.getAllRecipes(function(allTheRecipes){
			
			var json = {
				viewName: "landing",
				baseTemplate: 'base',
				data: {			
					allRecipes: allTheRecipes
				}
			};
			
			//if(req.header('X-Requested-With') == 'XMLHttpRequest' || req.body.json) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(json));
				res.end();
			/*}
			else {
				console.log('here');
				res.render("public/templates/" + json.baseTemplate,json);
			}*/
		});

	});

}


