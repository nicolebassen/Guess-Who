// Nicole Bassen and Kimberly Praxel
// Guess Who? Meteor website

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { tilesCollection } from '../collections/collections.js';
import { messagesCollection } from '../collections/collections.js';

import './main.html';

Meteor.subscribe('messages');

/**********************
	  TILES DATA
***********************/

var tiles = [
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
		frontImage: "qmark-red-tile.png"
	}
];

Session.set('tile', tiles); // store tiles data in a session
var allTiles = Session.get('tile'); // store tiles session in a variable

// keeps track of how many tiles are flipped over
var tileCounter = 0;

// start game, results of game (win/loss)
Session.set('gameMessage', "Choose a tile for your opponent to guess.");

// onclick event to flip a tile
var flipTile = Session.set('flipTile', "");

// tile that the player selects
var myTile = allTiles[15];
Session.set('myTile', myTile);

// computer opponent randomly selects a tile
var random = Math.floor(Math.random() * 15);
var opponentTile = allTiles[random];
console.log("The opponent chose " + opponentTile.name + " (ID" + opponentTile.id + ")");

// store the three rows of tiles separately
var firstRow = [];
var secondRow = [];
var thirdRow = [];

// fill in the three rows of tiles
for (var i = 0; i < 5; i++) {
	firstRow[i] = allTiles[i];
	secondRow[i] = allTiles[i + 5];
	thirdRow[i] = allTiles[i + 10];
}

/**********************
	   MAIN PANEL
***********************/

Template.mainbox.helpers({
	firstRow: function() {
		return firstRow;
	},
	secondRow: function() {
		return secondRow;
	},
	thirdRow: function() {
		return thirdRow;
	},
	myTile: function() {
		return Session.get('myTile');
	},
	flipTile: function() {
		return Session.get('flipTile');
	},
	gameMessage: function() {
		return Session.get('gameMessage');
	}
});

Template.mainbox.events({
    'click .playerTile': function(event) {
    	var id = event.currentTarget.id;
    	
    	// set tile flipped property to true
    	Session.set('flipTile', "this.classList.toggle('flipped')");
    	
        if (tileCounter == 0) {
        	// the tile the player is choosing
        	Session.set('myTile', allTiles[id]);
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


/**********************
	OPPONENT'S BOARD
***********************/

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
        //prevent the from from refreshing the page
        event.preventDefault();

        //get our form value (message text)
        var messageText = $('#messageText').val();
        $('#messageText').val(''); // remove text from our message box

        //get our data source (from session)
        var messages = Session.get('messages');
        
        var date = new Date();
        var time = date.toLocaleTimeString();
        
        //save our message
        messagesCollection.insert({
			name: "Player 1",
            messageText: messageText,
            time: time
        });
        
        scrollChat();
    }
});

Template.messageList.helpers({
	allMessages: function() {
		return messagesCollection.find({});
	}
});

Template.registerHelper('messagesExist', function() {
    return Session.get('messages').length > 0;
});




Meteor.subscribe("messages");



/**********************
 USER ACCOUNTS CONFIG
 ***********************/

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});
