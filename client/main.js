// Nicole Bassen and Kimberly Praxel
// Guess Who? Meteor website

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { tilesCollection } from '../collections/collections.js';

import './main.html';


/*var tiles = [
	{
		id: 0,
		name: "Kim",
		frontImage: "kim.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 1,
		name: "Nicole",
		frontImage: "nicole.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 2,
		name: "Chris",
		frontImage: "christopher.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 3,
		name: "Paige",
		frontImage: "paigegreen.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 4,
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 5,
		name: "Dinesh",
		frontImage: "dinesh.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 6,
		name: "Gilfoyle",
		frontImage: "gilfoyle.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 7,
		name: "Pam",
		frontImage: "pam.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 8,
		name: "Richard",
		frontImage: "richard.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 9,
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 10,
		name: "Kim",
		frontImage: "kim.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 11,
		name: "Nicole",
		frontImage: "nicole.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 12,
		name: "Chris",
		frontImage: "christopher.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 13,
		name: "Richard",
		frontImage: "richard.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 14,
		name: "Barbie",
		frontImage: "barbie.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 15,
		name: "",
		frontImage: "tileback.png"
	}
]*/

Session.set('tile', tiles); /*******/

// keeps track of how many tiles are flipped over
var tileCounter = 0;

// start game, results of game (win/loss)
Session.set('gameMessage', "Choose a tile for your opponent to guess.");

// store all tiles in a variable
var allTiles = Session.get('tile'); /*******/

// onclick event to flip a tile
var flipTile = Session.set('flipTile', "");

// tile that the player selects
var myTile = allTiles[15]; /*******/
Session.set('myTile', myTile); /*******/

// computer opponent randomly selects a tile
var random = Math.floor(Math.random() * 15);
var opponentTile = allTiles[random]; /*******/
console.log("The opponent's tile is: " + opponentTile.name + ", ID: " + opponentTile.id);

/*
// store the three rows of tiles separately
var firstRow = [];
var secondRow = [];
var thirdRow = [];

// fill in the three rows of tiles
for (var i = 0; i < 5; i++) {
	firstRow[i] = allTiles[i];
	secondRow[i] = allTiles[i + 5];
	thirdRow[i] = allTiles[i + 10];
}*/

var image = tilesCollection.find({id: 0}, {'image': 1});

Template.mainbox.helpers({
	firstRow: function() {
		return tilesCollection.find({id: {$lt: 5}}, {"sort": {"id": 1}}); //retrieve first row of tiles
	},
	secondRow: function() {
		return tilesCollection.find({id: {$gt: 4, $lt: 10}}, {"sort": {"id": 1}}); //retrieve second row of tiles
	},
	thirdRow: function() {
		return tilesCollection.find({id: {$gt: 9}}, {"sort": {"id": 1}}); //retrieve third row of tiles
	},
	myTile: function() {
		return Session.get('myTile');
	},
	flipTile: function() {
		return Session.get('flipTile');
	},
	gameMessage: function() {
		return Session.get('gameMessage');
	},
	image: function() {
		return image;
	}
});

Template.opponentBoard.helpers({
	firstRow: function() {
		return firstRow;
	},
	secondRow: function() {
		return secondRow;
	},
	thirdRow: function() {
		return thirdRow;
	},
	opponentTile: function() {
		return opponentTile;
	}
});

Template.mainbox.events({
    'click .playerTile': function(event) {
    	var id = event.currentTarget.id;
    	
    	// set tile flipped property to true
    	Session.set('flipTile', "this.classList.toggle('flipped')");
    	
        if (tileCounter == 0) {
        	// the tile the player is choosing
        	Session.set('myTile', allTiles[id]); /*******/
        	tileCounter++;
        	
        	Session.set('gameMessage', "Let's play!");
        	
        	// test
        	console.log("You chose: " + allTiles[id].id + " (" + allTiles[id].name + ")"); /*******/
        	Session.set('gameMessage', "");
        	
        	var flipped = tilesCollection.find({'id': id}, {'flipped': 1});
        	
        	// if image side of tile was facing up
        	if (flipped % 2 == 0) {
        		tilesCollection.update(
   					{ 'id': id },
   					{ $inc: {'flipped': 1}}
   				);
        		tileCounter++;
        		
        		// test
        		console.log(allTiles[id].name + ": " + allTiles[id].id + ", flipped: " + 
        				allTiles[id].flipped);/*******/
        	} 
        	// if blank side of tile was facing up
        	else {
        		tilesCollection.update(
   					{ 'id': id },
   					{ $dec: {'flipped': 1}}
   				);
         		tileCounter--;
         		
         		// test
         		console.log(allTiles[id].name + ": " + allTiles[id].id + ", flipped: " + 
         				allTiles[id].flipped);	/*******/
         	}
        }
        console.log("Tile counter: " + tileCounter);  // how many tiles are flipped over
        
        if (tileCounter >= 15) {
        	for (var i = 0; i < allTiles.length; i++) { /*******/
        		if (allTiles[i].flipped == 0) { /*******/
        			if (allTiles[i].id == opponentTile.id) { /*******/
        				Session.set('gameMessage', "That is your opponent's tile. You win!");
        				//window.alert("Game over. You win!!");     				
        				console.log("That is the opponent's tile. You win!!");
        			} else {
        				Session.set('gameMessage', "That is not your opponent's tile. You lose!");
        				//window.alert("Game over. You lose!!");    
        				console.log("That is not the opponent's tile. You lose!");
        			}
				}
			}
        }  
    }
});


//chat stuff

function scrollChat(){
	var height = $('#chatPanel')[0].scrollHeight;

	$('#chatPanel').scrollTop(height);
};

//save some initial data for our messaging application
Template.addMessageForm.onCreated(function() {
    Session.setDefault('messages', []);
});

Template.addMessageForm.events({
    'submit .newMessage': function(event, template) {
        //prevent the from from refreshing the page
        event.preventDefault();

        //get our form value (message text)
        var messageText = $('#messageText').val();
        $('#messageText').val(''); // remove text from our message box

        //get our data source (from session)
        var messages = Session.get('messages');

        //save our message
        messages.push({
            messageText: messageText,
        });

        Session.set('messages', messages);

		scrollChat();

    }
});

Template.messageList.helpers({
	allMessages: function() {
		return Session.get('messages');
	}
});

Template.registerHelper('messagesExist', function() {
    return Session.get('messages').length > 0;
});


