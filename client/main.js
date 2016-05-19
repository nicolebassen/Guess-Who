// Nicole Bassen and Kimberly Praxel
// Guess Who? Meteor website

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { tilesCollection } from '../collections/collections.js';
import { messagesCollection } from '../collections/collections.js';
import { usersCollection } from '../collections/collections.js';

import './main.html';

//Session.set('tile', tiles);

// keeps track of how many tiles are flipped over
var tileCounter = 0;

// start game, results of game (win/loss)
Session.set('gameMessage', "Choose a tile for your opponent to guess.");

// store all tiles in a variable
//var allTiles = Session.get('tile');

// onclick event to flip a tile
var flipTile = Session.set('flipTile', "");

// tile that the player selects
var myTile = tilesCollection.find({"id": 15});
//var myTile = allTiles[15];
Session.set('myTile', myTile);

// computer opponent randomly selects a tile
var random = Math.floor(Math.random() * 15);
var opponentTile = tilesCollection.find({"id": random});
// opponentTile = allTiles[random];
console.log("The opponent's tile is: " + opponentTile.name + ", ID: " + opponentTile.id);

// store the three rows of tiles separately
var firstRow = [];
var secondRow = [];
var thirdRow = [];

// fill in the three rows of tiles
/*
for (var i = 0; i < 5; i++) {
	firstRow[i] = allTiles[i];
	secondRow[i] = allTiles[i + 5];
	thirdRow[i] = allTiles[i + 10];
}*/

Template.mainbox.helpers({
	firstRow: function() {
		//console.log(tilesCollection.find({"id": { $lt: 5 }}).fetch();
		return tilesCollection.find({"id": { $lt: 5 }});
	},
	secondRow: function() {
		return tilesCollection.find({"id": { $lt: 10, $gt: 4 }});
	},
	thirdRow: function() {
		return tilesCollection.find({"id": { $lt: 15, $gt: 9 }});
	},
	myTile: function() {
		return myTile;
	},
	flipTile: function() {
		return Session.get('flipTile');
	},
	gameMessage: function() {
		return Session.get('gameMessage');
	}
});

Template.opponentBoard.helpers({
	firstRow: function() {
		return tilesCollection.find({"id": { $lt: 5 }});
	},
	secondRow: function() {
		return tilesCollection.find({"id": { $lt: 10, $gt: 4 }});
	},
	thirdRow: function() {
		return tilesCollection.find({"id": { $lt: 15, $gt: 9 }});
	},
	opponentTile: function() {
		return opponentTile;
	}
});

Template.mainbox.events({
	'click #tilesButton': function(event) {
		console.log(tilesCollection.find().fetch());
	},
	'click .playerTile': function(event) {
    	var id = event.currentTarget.id;
    	var selectedTile = tilesCollection.findOne({"id": id});
    	var selectedTileName = selectedTile.name;
    	console.log(selectedTile);
    	console.log(selectedTileName);
    	
    	// set tile flipped property to true
    	Session.set('flipTile', "this.classList.toggle('flipped')");
    	
        if (tileCounter == 0) {
        	// the tile the player is choosing
        	Session.set('myTile', selectedTile);
        	//Session.set('myTile', allTiles[id]);
        	tileCounter++;
        	
        	Session.set('gameMessage', "Let's play!");
        	
        	// test
        	console.log("You chose: " + allTiles[id].id + " (" + allTiles[id].name + ")");
        } else {
        	Session.set('gameMessage', "");
        	
        	// if image side of tile was facing up
        	if (allTiles[id].flipped % 2 == 0) {
        		allTiles[id].flipped++;	// switch flipped to true
        		tileCounter++;
        		
        		// test
        		console.log(allTiles[id].name + ": " + allTiles[id].id + ", flipped: " + 
        				allTiles[id].flipped);
        	} 
        	// if blank side of tile was facing up
        	else {
         		allTiles[id].flipped--; // switch flipped to false
         		tileCounter--;
         		
         		// test
         		console.log(allTiles[id].name + ": " + allTiles[id].id + ", flipped: " + 
         				allTiles[id].flipped);	
         	}
        }
        console.log("Tile counter: " + tileCounter);  // how many tiles are flipped over
        
        if (tileCounter >= 15) {
        	for (var i = 0; i < allTiles.length; i++) {
        		if (allTiles[i].flipped == 0) {
        			if (allTiles[i].id == opponentTile.id) {
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
        
        var date = new Date();
        var hours = date.getHours();
        
        if (hours == 0) {
        	hours = 12;
        } else {
        	hours = hours % 12;
        }
        
        var time = hours + ":" + (date.getMinutes());
        
        if (date.getHours() > 12) {
        	time += " PM";
        } else {
        	time += " AM";
        }
        
        //save our message
        messages.push({
            messageText: messageText,
            time: time
        });
        
        // add to messages collection
        messagesCollection.insert({
        	name: "Player1",
        	message: messageText,
        	time: time
        });
        console.log(messagesCollection.find().fetch()); // ***** not working

        Session.set('messages', messages);
        
        scrollChat();
    }
});

Template.messageList.helpers({
	allMessages: function() {
		return messagesCollection.find();
	}
});

Template.registerHelper('messagesExist', function() {
    return Session.get('messages').length > 0;
});

