// Nicole Bassen and Kimberly Praxel
// Guess Who? Meteor website

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { tilesCollection } from '../collections/collections.js';
import { messagesCollection } from '../collections/collections.js';

import './main.html';

Meteor.subscribe("allUsers");
Meteor.subscribe('userStatus');

/**********************
	  TILES DATA
***********************/

var tiles = [
	{
		id: 0,
		name: "Kim",
		frontImage: "kim.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 1,
		name: "Nicole",
		frontImage: "nicole.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 2,
		name: "Josh",
		frontImage: "jhawks.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 3,
		name: "Paige",
		frontImage: "paigegreen.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 4,
		name: "Archer",
		frontImage: "archer.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 5,
		name: "Dinesh",
		frontImage: "dinesh.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 6,
		name: "Gilfoyle",
		frontImage: "gilfoyle.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 7,
		name: "Pam",
		frontImage: "pam.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 8,
		name: "Gurman",
		frontImage: "gurman.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 9,
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 10,
		name: "Kim",
		frontImage: "kim.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 11,
		name: "Clark",
		frontImage: "jclark.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 12,
		name: "Chris",
		frontImage: "christopher.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 13,
		name: "Richard",
		frontImage: "richard.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 14,
		name: "Barbie",
		frontImage: "barbie.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 15,
		name: "",
		frontImage: "qmark-red-tile.png"
	}
];

// tracks whether game is still going
Session.set('gameOver', false);

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
console.log("The opponent's tile is " + opponentTile.name + "; ID " + opponentTile.id);

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
	},
	currentUser: function() {
		return Meteor.user();
	},
	opponent: function() {
		return Meteor.users.findOne({"username": "computer"});
	}
});

Template.mainbox.events({
	
    'click .playerTile': function(event) {
		var id = event.currentTarget.id;
		
		if (tileCounter < 14) {
			// set tile flipped property to true
			Session.set('flipTile', "this.classList.toggle('flipped')");
    	
			if (tileCounter == 0) {
				// the tile the player is choosing
				Session.set('myTile', allTiles[id]);
				tileCounter++;
        	
				Session.set('gameMessage', "Let's play!");
			} else {
				Session.set('gameMessage', "");
        	
				// if image side of tile was facing up
				if (allTiles[id].flipped % 2 == 0) {
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
        } else {
			allTiles[id].flipped++; // change flipped property of the last tile flipped
			
			// find the remaining (unflipped) tile and compare to opponent's tile
			for (var i = 0; i < allTiles.length; i++) {
				if (allTiles[i].flipped == 0) {
					
					// temporary opponent is computer
					var opponent = Meteor.users.findOne({"username": "computer"}, {"_id": 1});
					
					if (allTiles[i].id == opponentTile.id) {
						Session.set('gameMessage', "That is your opponent's tile. You win!");
						
						// update win count for user and loss count for opponent
						Meteor.call('winsIncrement', Meteor.userId());
						Meteor.call('lossesIncrement', opponent._id);
					} else {
						Session.set('gameMessage', "That is not your opponent's tile. You lose!");
						
						// update loss count for user and win count for opponent
						Meteor.call('lossesIncrement', Meteor.userId());
						Meteor.call('winsIncrement', opponent._id);
					}
				}
			}
			
			Session.set('flipTile', ''); // can no longer flip tiles
			Session.set('gameOver', true);	// game is over
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

Meteor.subscribe("messageInsert");

function scrollChat(){
	var height = $('#chatPanel')[0].scrollHeight;

	$('#chatPanel').scrollTop(height);
};

Template.addMessageForm.onCreated(function() {
	Meteor.subscribe('allMessages');
});

Template.addMessageForm.events({
    'submit .newMessage': function(event, template) {
        //prevent the from from refreshing the page
        event.preventDefault();

        //get our form value (message text)
        var messageText = $('#messageText').val();
        $('#messageText').val(''); // remove text from our message box
		var date = new Date();
		var time = date.toLocaleTimeString();
		var currentUsername = Meteor.user().username;

		// create a message object to insert into the collection
		var newMessage = {
			name: currentUsername,
			message: messageText,
			time: time
		}

		// add message object to the messages collection
		Meteor.call('messageInsert', newMessage);
        
        scrollChat();
    }
});

Template.messageList.helpers({
	allMessages: function() {
		return messagesCollection.find({});
	}
});

// Scroll chat any time it's rendered on screen
Template.messageList.onRendered(function() {
	scrollChat();
});


Template.registerHelper('messagesExist', function() {
	return Session.get('messages').length > 0;
});

/**********************
	  USERS LIST
 ***********************/

Session.set('viewUsername', null);
Session.set('viewUserWins', null);
Session.set('viewUserLosses', null);

Template.infoPanel.helpers({
   /*users: function() {
       return Meteor.users.find({ username: { $not: (Meteor.user() || {}).username } });
   },*/
   onlineUsersList: function() {
		return Meteor.users.find({$or: [{"status.online": true}, {"username": "computer"}] }); // users that are logged in
   },
   viewUsername: function() {
		return Session.get('viewUsername');
   },
   viewUserWins: function() {
		return Session.get('viewUserWins');
   },
   viewUserLosses: function() {
		return Session.get('viewUserLosses');
   }
});
	
Template.infoPanel.events({
	// when the user clicks on a username
	'click .userItem': function(event) {
		event.preventDefault();
		
		var id = event.currentTarget.id;
		var viewUser = Meteor.users.findOne({"_id": id}, {"username": 1});
		
		// set target user data in sessions to return and display in info panel
		Session.set('viewUsername', viewUser.username);
		Session.set('viewUserWins', viewUser.profile.wins);
		Session.set('viewUserLosses', viewUser.profile.losses);
		
		var onlineUsers = document.getElementById('onlineUsers');
		var userInfo = document.getElementById('userInfo');
		
		onlineUsers.style.display = 'none'; // hide online users list
		userInfo.style.display = 'block'; // show target user data
   },
   // when the user clicks 'back'
   'click #backToUsers': function(event) {
		event.preventDefault();
		
		var onlineUsers = document.getElementById('onlineUsers');
		var userInfo = document.getElementById('userInfo');
		
		userInfo.style.display = 'none'; // hide user data
		onlineUsers.style.display = 'block'; // show online users list
   }
});

/**********************
	  HIGH SCORES
 ***********************/
Template.highScores.helpers({
	highScoresUsers: function() {
		console.log(Meteor.users.find({}, {"sort": {"profile.wins": -1}, "limit": 2}));;
		return Meteor.users.find({}, {"sort": {"profile.wins": -1}, "limit": 10});
	}
});

/**********************
 USER ACCOUNTS CONFIG
 ***********************/

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});
