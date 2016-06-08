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
    newTiles = [];
	for (var i = 0; i < tiles.length; i++) {
        newTiles.push(tiles[i]);
    }
	return newTiles;
}

Session.set('tile', tiles); // store tiles data in a session
var allTiles = Session.get('tile'); // store tiles session in a variable

// start game, results of game (win/loss)
Session.set('gameMessaage', "Choose a tile for your opponent to guess.");

// onclick event to flip a tile
var flipTile = Session.set('flipTile', "");

/**********************
	   MAIN PANEL
***********************/

Template.mainbox.helpers({
	firstRow: function() {
		if (Meteor.user()) {
            var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		
		
		if (currentGame != null && currentGame.player1 != null) {

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
		
		if (currentGame != null && currentGame.player1 != null) {
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
		
		if (currentGame != null && currentGame.player2 != null && currentGame.player1 != null) {
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
	opponent: function() {
		if (Meteor.user()) {
			var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		if (currentGame != null) {
            if (currentGame.player1.username == Meteor.user().username) {
				return currentGame.player2;
			} else if (currentGame.player2.username == Meteor.user().username) {
				return currentGame.player1;
			}
        }
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

function toggleImage() {
    this.classList.toggle('flipped')
}

Template.mainbox.events({
	
    'click .playerTile': function(event) {
		var id = event.currentTarget.id;
		event.stopImmediatePropagation();
		
		// store current game document
		if (Meteor.user()) {
            var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
        }
		
		if (currentGame != null) {
			if (Meteor.user().username == currentGame.player1.username) {
				var currentUser = currentGame.player1;
				var opponent = currentGame.player2;
				var userTileCounter = currentGame.p1tileCounter;
				var oppTileCounter = currentGame.p2tileCounter;
                var userBoard = currentGame.player1Board;
				var opponentTile = currentGame.player2Tile;
				var userTile = currentGame.player1Tile;
            } else if (Meteor.user().username == currentGame.player2.username) {
				var currentuser = currentGame.player2;
				var opponent = currentGame.player1;
				var userTileCounter = currentGame.p2tileCounter;
				var oppTileCounter = currentGame.p1tileCounter;
                var userBoard = currentGame.player2Board;
				var opponentTile = currentGame.player1Tile;
				var userTile = currentGame.player2Tile;
            }
        }
		
		if (userTileCounter < 13) {
			//is this the first tile selection?
			if (userTileCounter == -1) {
				console.log("User tile counter: " + userTileCounter);
				// set the tile that the player is choosing
                Meteor.call('chooseTile', Meteor.user(), id);
				Meteor.call('incTileCounter', Meteor.user());
				
				Session.set('flipTile', "this.classList.toggle('flipped')");
				Session.set('gameMessage', "Let's play!");
			} else {
				console.log('flipped');
				// set tile flipped property to true
				//Session.set('flipTile', "this.classList.toggle('back')");
				Session.set('gameMessage', "");
				console.log("Flipped?" + userBoard[id].flipped);
				
				// if image side of tile was facing up
				if (userBoard[id].flipped % 2 == 0) {
					Meteor.call('incFlipped', Meteor.user(), id);
					Meteor.call('incTileCounter', Meteor.user());

				} 
				// if blank side of tile was facing up
				else if (userBoard[id].flipped % 2 == 1) {
					Meteor.call('decFlipped', Meteor.user(), id)
					Meteor.call('decTileCounter', Meteor.user());
				}

			}
			console.log("Player 1 Tile counter: " + userTileCounter);  // how many tiles are flipped over
			console.log("Player 2 Tile counter: " + oppTileCounter);
        } else {
			// NOT WORKING
			Meteor.call('incTileCounter', Meteor.user());
			Meteor.call('incFlipped', Meteor.user(), id, function(error, result) {
				 // find the remaining (unflipped) tile and compare to opponent's tile
				for (var i = 0; i < 15; i++) {
					console.log(userBoard[i]);
					if (userBoard[i].flipped == 0 && userBoard[i].id != id) {
						console.log(opponentTile);
	
						if (userBoard[i].id == opponentTile.id) {
							Session.set('gameMessage', "That is your opponent's tile. You win!");
							//alert("You win! " + opponentTile.name + ", Your tile: " + userBoard[i].name);
							if (currentUser != null && opponent != null) {
								// update win count for user and loss count for opponent
								Meteor.call('winsIncrement', currentUser);
								Meteor.call('lossesIncrement', opponent);
							}
							
						} else {
							Session.set('gameMessage', "That is not your opponent's tile. You lose!");
							//alert("You lose! " + opponentTile.name + ", Your tile: " + userBoard[i].name);
							if (currentUser != null && opponent != null) {
								// update loss count for user and win count for opponent
								Meteor.call('lossesIncrement', currentUser);
								Meteor.call('winsIncrement', opponent);
							}
						}
					}
				}
				// remove game from collection after 15 seconds
				setTimeout(function() { Meteor.call('removeGame', currentGame); }, 15000);
				setTimeout(function() { Session.set('gameMessage', ""); }, 15000);
				Session.set('flipTile', ''); // can no longer flip tiles
			});

                   
				
				
				
			} // change flipped property of the last tile flipped
			
			
			
		
    },
	// remove the current game from the collection
	'click #leaveGame': function(event) {
		var currentGame = gamesCollection.findOne({"_id": Meteor.user().profile.partOfGame});
		Meteor.call('removeGame', currentGame);
		Session.set('flipTile', '');
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
		
		if (currentGame != null && currentGame.player2 != null && currentGame.player1 != null) {
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
		
		if (currentGame != null && currentGame.player2 != null && currentGame.player1 != null) {
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
		
		if (currentGame != null && currentGame.player2 != null && currentGame.player1 != null) {
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
				p1tileCounter: -1,
				p2tileCounter: -1,
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
				Session.set('gameMessage', "Choose a tile for your opponent to guess.");
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
		return Meteor.users.find({}, {"sort": {"profile.wins": -1, "profile.losses": 1}, "limit": 10});
	}
});

/**********************
 USER ACCOUNTS CONFIG
 ***********************/

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});