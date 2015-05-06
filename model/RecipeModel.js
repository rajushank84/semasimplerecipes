var easyimg = require('easyimage');

RecipeModel = function() {
	this.name = null;
	this.method = null;
	this.ingredients = [];
	this.description = null;
	this.id = null;
	this.image = null;
};

RecipeModel.getAllRecipes = function(callback) {
    var listData = function(err, collection) {
            //console.log(collection);
            collection.find().toArray(function(err, results) {
                myData = results;
                return(callback(myData));
            });
        },
        Client = this.getDbClient(),
        dbDetails = this.getDbDetails();

    Client.open(function(err, pClient) {
        Client.authenticate(dbDetails['userName'], dbDetails['password'], {authdb: dbDetails['db']},  function(err, success) {
            Client.collection('mytable', listData);
            Client.close();
        });
    });
};


RecipeModel.saveRecipe = function(data, callback) {
    var insertData = function(err, collection) {
            collection.insert(data);
            return(callback());
        },
        Client = this.getDbClient(),
        dbDetails = this.getDbDetails();
    
    Client.open(function(err, pClient) {
        Client.authenticate(dbDetails['userName'], dbDetails['password'], {authdb: dbDetails['db']},  function(err, success) {
            Client.collection('mytable', insertData);
            Client.close();
       });
    });
    
    //console.log(data.image);

    easyimg.thumbnail(
        {
            src: './public/images/' + data.image , dst: './public/images/thumbnail_' + data.image,
            width:100, height:100,
            x:0, y:0
        },
        function(err, image) {
            if (err) {
                // do nothing
            }
        }
    );  
};

RecipeModel.getDbDetails = function() {
    // switch between live and localhost here
    var configuration = 'live';

    if(configuration === 'live') {
        /*  Usually for a mongolab connection it looks like this:
                userName, password given when you register for mongolab
                server: a unique server name that mongolab gives you. For example: ds031607.mongolab.com
                post: the port that mongolab gives you. For example: 31607
        */

        return({
            'userName': '',
            'password': '',
            'db': 'mongodb',
            'server': 'ds031607.mongolab.com',
            'port': 31607
        });
    }
    else {
        /*  Usually for a localhost connection it looks like this:
                userName, password are blank. if that doesn't work, try your mac's administrator username/password
                server: localhost server ip. usually it is 127.0.0.1
                post: this is usually 27017. if that doesn't work, find out what port mongod is running on.
        */
        return({
            'userName': '',
            'password': '',
            'db': 'test',
            'server': '127.0.0.1',
            'port': 27017
        });
    }
};

RecipeModel.getDbClient = function() {
    var Db = require('mongodb').Db,
        Server = require('mongodb').Server,
        dbDetails = this.getDbDetails(),
        server = new Server(dbDetails['server'], dbDetails['port'], {auto_reconnect : true}),
        Client = new Db(dbDetails['db'], server);

    return Client;  
};    


module.exports = RecipeModel;

