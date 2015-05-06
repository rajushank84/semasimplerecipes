var RecipeModel = require('../model/RecipeModel');

module.exports = function(app) {
       
	app.get('/shareRecipe', function(req, res) {

		RecipeModel.getAllRecipes(function(allTheRecipes){
		
			var json = {
				viewName: "shareRecipe",
				baseTemplate: 'base',
				data: {			
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

	app.post('/doShare', function(req, res) {

		//console.log(req.body.ingredients);

		var data = {},
			ingredients = req.body.ingredients.split('&&'),
			ingredientsString = '',
			fs = require('fs');	

		ingredientsString='{"ingredients": [';

		for(var i in ingredients) {
		   ingredientsString=ingredientsString + '{"ingredient":"' + ingredients[i] + '"}';
		   if(ingredients.length-1 - i !== 0){
		        ingredientsString=ingredientsString + ',';
		    }
		}
		ingredientsString = ingredientsString + '] }';

		data = JSON.parse(ingredientsString);

		data.name = req.body.name;
		data.description = req.body.description;
		data.method = req.body.method.replace(/&&/g,'<br/>');
		data.image = req.files.mainImage.name;

		if(data.image !== '') {
		    var tmp_path = req.files.mainImage.path;
		    // set where the file should actually exists - in this case it is in the "images" directory
		    var target_path = './public/images/' + req.files.mainImage.name;
		    // move the file from the temporary location to the intended location
		    fs.rename(tmp_path, target_path, function(err) {
		        if (err) {
		        	throw err;
		        }

		        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
		        fs.unlink(tmp_path, function() {
		            if (err) {
		            	throw err;
		            }
			    });
		    });
		}

		RecipeModel.saveRecipe(data, function(){		
			RecipeModel.getAllRecipes(function(allTheRecipes){

				var json = {
					viewName: "landing",
					baseTemplate: 'base',
					data: {			
						allRecipes: allTheRecipes
					}
				};

				if (req.header('X-Requested-With') == 'XMLHttpRequest') {
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.write(JSON.stringify(json));
					res.end();
				}
				else {
					res.render("public/templates/" + json.baseTemplate,json);
				}
			});
		});
	});
}
