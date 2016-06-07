// Nicole Bassen and Kimberly Praxel
// Guess Who? Meteor website

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { tilesCollection } from '../collections/collections.js';
import { messagesCollection } from '../collections/collections.js';
import { gamesCollection } from '../collections/collections.js';


import './main.html';

// SUBSCRIPTIONS

Meteor.subscribe("allUsers");
Meteor.subscribe('userStatus');

/**********************
	  TILES DATA
***********************/

var tiles = [
	{
		id: 0,
		name: "Jami",
		frontImage: "jami.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "xmark-blue-tile.png",
		opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 1,
		name: "Nicole",
		frontImage: "nicole.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 2,
		name: "Josh",
		frontImage: "jhawks.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 3,
		name: "Paige",
		frontImage: "paigegreen.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 4,
		name: "Archer",
		frontImage: "archer.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 5,
		name: "Peter",
		frontImage: "peter.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 6,
		name: "Neal",
		frontImage: "neal.png",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 7,
		name: "Arnold",
		frontImage: "arnold.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 8,
		name: "Gurman",
		frontImage: "gurman.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 9,
		name: "Sahba",
		frontImage: "sahba.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 10,
		name: "Kimberly",
		frontImage: "kim.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 11,
		name: "Clark",
		frontImage: "jclark.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 12,
		name: "Chris",
		frontImage: "christopher.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 13,
		name: "Francisco",
		frontImage: "francisco.jpg",
		backImage: "qmark-red-tile-sm.png",
        opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 14,
		name: "Ben",
		frontImage: "ben.jpg",
		backImage: "qmark-red-tile-sm.png",
		opponentBackImage: "xmark-blue-tile.png",
        opponentFrontImage: "qmark-blue-tile.png",
		flipped: 0
	},
	{
		id: 15,
		name: "",
		frontImage: "qmark-red-tile.png"
	}
];

function copyTiles() {
    var newTiles = [];
	
	for (var i = 0; i <= 15; i++) {
        newTiles.push(tiles[i]);
    }
	
	return newTiles;
}

// tracks whether game is still going
Session.set('gameOver', false);

Session.set('tile', tiles); // store tiles data in a session
var allTiles = Session.get('tile'); // store tiles session in a variable

// keeps track of how many tiles are flipped over
//Session.set('tileCounter', 0);

// start game, results of game (win/loss)
Session.set('gameMessaage', "Choose a tile for your opponent to guess.");

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
/*
var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
if (currentGame.player1 == Meteor.user()) {
    var userBoard = currentGame.player1Board;
	var opponentBoard = currentGame.player2Board;
} else {
    var userBoard = currentGame.player2Board;
	var opponentBoard = currentGame.player1Board;
}
*/

Template.mainbox.helpers({
	firstRow: function() {
		if (Meteor.user()) {
            var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		
		
		if (currentGame != null) {

			if (currentGame.player1.username == Meteor.user().username) {
				var userBoard = currentGame.player1Board;
				var firstRow = [];
				for (var x = 0; x < 5; x++) {
					firstRow.push(userBoard[x]);
				}
				return firstRow;
			} else if (currentGame.player2.username == Meteor.user().username) {
				var userBoard = currentGame.player2Board;
				var firstRow = [];
				for (var x = 0; x < 5; x++) {
					firstRow.push(userBoard[x]);
				}
				return firstRow;
			}
		}

	},
	secondRow: function() {
		if (Meteor.user()) {
			var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
		}
		
		if (currentGame != null) {
			if (currentGame.player1.username == Meteor.user().username) {
				var userBoard = currentGame.player1Board;
				var secondRow = [];
				for (var x = 5; x < 10; x++) {
					secondRow.push(userBoard[x]);
				}
				return secondRow;
			} else if (currentGame.player2.username == Meteor.user().username) {
				var userBoard = currentGame.player2Board;
				var secondRow = [];
				for (var x = 5; x < 10; x++) {
					secondRow.push(userBoard[x]);
				}
				return secondRow;
			}
		}
	},
	thirdRow: function() {
		if (Meteor.user()) {
			var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
		}
		
		if (currentGame != null) {
			if (currentGame.player1.username == Meteor.user().username) {
				var userBoard = currentGame.player1Board;
				var thirdRow = [];
				for (var x = 10; x < 15; x++) {
					thirdRow.push(userBoard[x]);
				}
				return thirdRow;
			} else if (currentGame.player2.username == Meteor.user().username) {
				var userBoard = currentGame.player2Board;
				var thirdRow = [];
				for (var x = 10; x < 15; x++) {
					thirdRow.push(userBoard[x]);
				}
				return thirdRow;
			}
		}
	},
	myTile: function() {
		if (Meteor.user()) {
			var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
		}
		
		if (currentGame != null) {
			if (currentGame.player1.username == Meteor.user().username) {
				return currentGame.player1Tile;
			} else if (currentGame.player2.username == Meteor.user().username) {
				return currentGame.player2Tile;
			}
		}
	},
	flipTile: function() {
		return Session.get('flipTile');
	},
	gameMessage: function() {
		return Session.get('gameMessage');
	},
	preGameMessage: function() {
		return Session.get('preGameMessage');
	},
	currentUser: function() {
		return Meteor.user();
	},
	currentGame: function() {
		if (Meteor.user()) {
			var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
			if (currentGame) {
                return currentGame;
            }
		}
    }
});

Template.mainbox.events({
	
    'click .playerTile': function(event) {
		var id = event.currentTarget.id;
		
		// store current game document
		if (Meteor.user()) {
            var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		
		if (currentGame != null) {
			var tileCounter = currentGame.tileCounter;
			if (Meteor.user().username == currentGame.player1.username) {
                userBoard = currentGame.player1Board;
            } else if (Meteor.user().username == currentGame.player2.username) {
                userBoard = currentGame.player2Board;
            }
        }
		
		if (tileCounter < 14) {
			// set tile flipped property to true
			Session.set('flipTile', "this.classList.toggle('flipped')");
			console.log("Event Target ID: " + id);
			if (tileCounter == 0) {
				// set the tile that the player is choosing
                Meteor.call('chooseTile', Meteor.user(), id);
				Meteor.call('incTileCounter', Meteor.user());
				
				Session.set('gameMessage', "Let's play!");
			} else {
				Meteor.call('decTileCounter', Meteor.user());
				Session.set('gameMessage', "");
        	
				// if image side of tile was facing up
				if (userBoard[id].flipped % 2 == 0) {
					Meteor.call('incFlipped', Meteor.user(), id);
					//allTiles[id].flipped++;	// switch flipped to true
					Meteor.call('incTileCounter', Meteor.user());
					
					//tileCounter++;
				} 
				// if blank side of tile was facing up
				else {
					Meteor.call('decFlipped', Meteor.user(), id)
					//allTiles[id].flipped--; // switch flipped to false
					Meteor.call('decTileCounter', Meteor.user());
					//tileCounter--;
				}
				console.log("FLipped: " + userBoard[id].flipped);
				//Session.set('tileCounter', tileCounter + 1);
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
    },
	// remove the current game from the collection
	'click #leaveGame': function(event) {
		var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
		Meteor.call('removeGame', currentGame);
	}
});


/**********************
	OPPONENT'S BOARD
***********************/

Template.opponentBoard.helpers({
	firstRow: function() {
		if (Meteor.user()) {
            var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		
		if (currentGame != null) {
			if (currentGame.player1.username == Meteor.user().username) {
				var opponentBoard = currentGame.player2Board;
				var firstRow = [];
				for (var x = 0; x < 5; x++) {
					firstRow.push(opponentBoard[x]);
				}
				return firstRow;
			} else if (currentGame.player2.username == Meteor.user().username) {
				var opponentBoard = currentGame.player1Board;
				var firstRow = [];
				for (var x = 0; x < 5; x++) {
					firstRow.push(opponentBoard[x]);
				}
				return firstRow;
			}
        }
	},
	secondRow: function() {
		if (Meteor.user()) {
            var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		
		if (currentGame != null) {
			if (currentGame.player1.username == Meteor.user().username) {
				var opponentBoard = currentGame.player2Board;
				var secondRow = [];
				for (var x = 5; x < 10; x++) {
					secondRow.push(opponentBoard[x]);
				}
				return secondRow;
			} else if (currentGame.player2.username == Meteor.user().username) {
				var opponentBoard = currentGame.player1Board;
				var secondRow = [];
				for (var x = 5; x < 10; x++) {
					secondRow.push(opponentBoard[x]);
				}
				return secondRow;
			}
		}
	},
	thirdRow: function() {
		if (Meteor.user()) {
            var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		
		if (currentGame != null) {
			if (currentGame.player1.username == Meteor.user().username) {
				var opponentBoard = currentGame.player2Board;
				var thirdRow = [];
				for (var x = 10; x < 15; x++) {
					thirdRow.push(opponentBoard[x]);
				}
				return thirdRow;
			} else if (currentGame.player2.username == Meteor.user().username) {
				var opponentBoard = currentGame.player1Board;
				var thirdRow = [];
				for (var x = 10; x < 15; x++) {
					thirdRow.push(opponentBoard[x]);
				}
				return thirdRow;
			}
		}
	},
	opponentTile: function() {
		if (Meteor.user()) {
            var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		
		if (currentGame != null) {
			if (currentGame.player2 == Meteor.user()) {
				return currentGame.player1Tile;
			} else if (currentGame.player2 == Meteor.user()) {
				return currentGame.player2Tile;
			}
		}
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

		if (Meteor.user().profile.partOfGame == null) {
            $('#messageText').val(''); // remove text from our message box
			
        } else {
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
			};

			var game = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
			var gameId = game._id;
			
			// add message object to the messages collection
			Meteor.call('messageInsert', newMessage, gameId);
		}
        
        scrollChat();
    }
});

Template.messageList.helpers({
	gameMessages: function() {
		if (Meteor.user()) {
            var game = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		
		
		if (game != null) {
            return game.messages;
        }
	},
	defaultMessages: function() {
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

Template.infoPanel.onCreated(function() {
	Meteor.subscribe('allGames');
});

Template.infoPanel.helpers({
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
   },
   gamesList: function() {
		return gamesCollection.find({});
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
   },
   // create a new game with current user and an empty slot
	'click button.newGameButton': function(event) {
		var user = Meteor.user();

		// if user is not in a match
		if (user.profile.partOfGame == null) {
            //create the new game
			var newGame = {
				date: new Date(),
				tileCounter: 0,
				player1: user,
				player2: null,
				gameStarted: false,
				player1Tile: tiles[15],
				player2Tile: tiles[15],
				player1Board: copyTiles(),
				player2Board: copyTiles(),
				matchFull: false,
				messages: [{name: "Guess Who Game", message: "Use this panel to send messages to your opponent!"}]
			};
			var currentGame;
			Meteor.call('gameInsert', newGame, function(error, result) {
				currentGame = result;
				Meteor.users.update({"_id": user._id}, {$set: {
					"profile.partOfGame": currentGame
				}});
			});
		}
    },
	// when a user joins a game
	'click a.joinGame': function(event) {
		// store the ID of the game the user has joined
		var gameId = event.currentTarget.id;
		
		function matchFull(gameId) {
            var game = gamesCollection.findOne({"_id": gameId});
			if (game.player1 != null && game.player2 != null) {
				return true;
			} else {
				return false;
			}
        }
		
		if (matchFull(gameId) == false) {
            var user = Meteor.user();
			if (user.profile.partOfGame == null) {
				var currentGame = gamesCollection.findOne({"_id": gameId});
				var opponent = currentGame.player1;
				Session.set('opponent', opponent);
				Meteor.call('addToGame', user, gameId);
			}
        }
			
	}
});

Template.registerHelper('matchReady', function() {
	var user = Meteor.user();

	//check if we have a user and a match associated with the user
	if (user && user.profile.partOfGame) {
		var match = gamesCollection.findOne({"_id": user.profile.partOfGame});

		if (match)
		{
			//check if two players are in the match
			return match.player1 && match.player2;
		}	
	}

	return false;
});



Template.registerHelper('playerInGame', function() {
		//determines if a player is in a game or not
		var user = Meteor.user();

		if (user) {
			var profile = user.profile;		

			if (profile.partOfGame) {
				return profile.partOfGame;
			}
		}

		return false;
});

/**********************
	  HIGH SCORES
 ***********************/
Template.highScores.helpers({
	highScoresUsers: function() {
		return Meteor.users.find({}, {"sort": {"profile.wins": -1}, "limit": 10});
	}
});

/**********************
 USER ACCOUNTS CONFIG
 ***********************/

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});