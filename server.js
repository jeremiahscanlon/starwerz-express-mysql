// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Sets up the mysql connection
// =============================================================
var connection = require('./config/connection.js');

// Sets up handlebars
// =============================================================
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Star Wars Characters (DATA)
// =============================================================
var characters = [

	{
		routeName: "yoda",
		name: "Yoda",
		role: "Jedi Master",
		age: 900,
		forcePoints: 2000		
	},

	{
		routeName: "darthmaul",
		name: "Darth Maul",
		role: "Sith Lord",
		age: 200,
		forcePoints: 1200		
	},

	{
		routeName: "obiwankenobi",
		name: "Obi Wan Kenobi",
		role: "Jedi Master",
		age: 55,
		forcePoints: 1350
	}
]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res){
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/view.html'));
})

app.get('/add', function(req, res){
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/add.html'));
	
})

app.get('/all', function(req, res){
	//res.send("Welcome to the Star Wars Page!")
	//res.sendFile(path.join(__dirname + '/all.html'));
	var s = 'SELECT * FROM characters';
    connection.query(s, function(err, result) {
		var data = {'result':result}
		res.render('home', data);
		console.log(data);
    });
	
})

// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:characters?', function(req, res){

	var chosen = req.params.characters;

	if(chosen){
		console.log(chosen);

		var s = 'SELECT * FROM characters';
	    connection.query(s, function(err, result) {
	        for (var i = 0; i < result.length; i++) {
	        	if(chosen == result[i].routeName){
	        		res.json(result[i]);
	        	}
	        }
	    });

		// for (var i=0; i <characters.length; i++){

		// 	if (chosen == characters[i].routeName){
		// 		res.json(characters[i]);
		// 		return;
		// 	}
		// }

		// res.json(false);
	}

	else{
		var s = 'SELECT * FROM characters';
	    connection.query(s, function(err, result) {
    		res.json(result);
	    });
	}
})

// Create New Characters - takes in JSON input
app.post('/api/new', function(req, res){

	var newcharacter = req.body;
	newcharacter.routeName = newcharacter.name.replace(/\s+/g, '').toLowerCase()

	var s = 'INSERT INTO characters (routeName, name,role,age,forcePoints) Values (?,?,?,?,?)';
    connection.query(s,[newcharacter.routeName,newcharacter.name,newcharacter.role,newcharacter.age,newcharacter.forcePoints], function(err, result) {
        console.log(result);
    });

// 	console.log(newcharacter);

// 	characters.push(newcharacter);

// 	res.json(newcharacter);
})

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})