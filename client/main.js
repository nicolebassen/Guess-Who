/*
 	Nicole Bassen and Kimberly Praxel
 	Guess Who? Meteor website
 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { tilesCollection } from '../collections/collections.js';
import { messagesCollection } from '../collections/collections.js';
import { usersCollection } from '../collections/collections.js';

import './main.html';

// keeps track of how many tiles in main panel are flipped over
var tileCounter = 0;

// initial game message to the user from the computer
Session.set('gameMessage', "Choose a tile for your opponent to guess.");

// onclick event to flip a tile
var flipTile = Session.set('flipTile', ""); 

// tile that the player selects
var myTile = tilesCollection.find({"id": 15}); 

// computer opponent randomly selects a tile
var random = Math.floor(Math.random() * 15);
var opponentTile = tilesCollection.find({"id": random});


/**********************
	   MAIN PANEL
***********************/

Template.mainbox.events({
	'click .playerTile': function(event) {
    	var id = event.currentTarget.id;
    	var selectedTile = tilesCollection.findOne({"id": id});
    	var selectedTileName = tilesCollection.findOne({"id": id}, {"name": 1});
    	console.log(selectedTile);
    	console.log(selectedTileName);
    	
    	// set tile flipped property to true
    	Session.set('flipTile', "this.classList.toggle('flipped')");
    	
        if (tileCounter == 0) {
        	// the tile the player is choosing
        	myTile = selectedTile;
        	//Session.set('myTile', allTiles[id]);
        	tileCounter++;
        	
        	Session.set('gameMessage', "Let's play!");
        } else {
        	Session.set('gameMessage', "");
        	var flipped = tilesCollection.findOne({"id": id}, {"flipped": 1});
        	console.log("Flipped: " + flipped);
        	// if image side of tile was facing up
        	if (flipped % 2 == 0) {
        		allTiles[id].flipped++;	// switch flipped to true
        		tileCounter++;
        		
        	} 
        	// if blank side of tile was facing up
        	else {
         		allTiles[id].flipped--; // switch flipped to false
         		tileCounter--;
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
	myTileName: function() {
		return myTile;
	},
	flipTile: function() {
		return Session.get('flipTile');
	},
	gameMessage: function() {
		return Session.get('gameMessage');
	}
});


/**********************
	OPPONENT'S BOARD
***********************/

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


/**********************
	   INFO PANEL
***********************/

Template.infoPanel.helpers({
	onlineUsers: function() {
		return usersCollection.find({"online":  true});
	}
});



/**********************
	   CHAT STUFF
***********************/

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
        //prevent the form from refreshing the page
        event.preventDefault();

        //get our form value (message text)
        var messageText = $('#messageText').val();
        $('#messageText').val(''); // remove text from our message box
        
        // create a timestamp
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        
        if (hours == 0) {
        	hours = 12;
        } else {
        	hours = hours % 12;
        }
        
        if (minutes < 10) { 
        	minutes = "0" + minutes; 
        }
        
        var time = hours + ":" + minutes;
        
        if (date.getHours() > 12) { 
        	time += " PM"; 
        } else {
        	time += " AM";
        }
        
        // add message data to messages collection
        messagesCollection.insert({
        	name: "Player1",
        	message: messageText,
        	time: time
        });
        
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

