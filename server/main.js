/*
 	Nicole Bassen and Kimberly Praxel
 	Guess Who? Meteor website
 */

import { Meteor } from 'meteor/meteor';
import { messagesCollection } from '../collections/collections.js';
import { messagesData } from '../collections/collections.js';
import { gamesCollection } from '../collections/collections.js';



Meteor.startup(() => {

     messagesCollection.remove({});
     for (var i = 0; i < messagesData.length; i++) {
        messagesCollection.insert(messagesData[i]);
     }

	// all user accounts
	Meteor.publish('allUsers', function() {
        return Meteor.users.find({});
    });
	
	// tracks online status of users
	Meteor.publish("userStatus", function() {
	  return Meteor.users.find({ "status.online": true });
	});
	
    Meteor.publish('messageInsert', function () {
        //sort by most recent changes
        return messagesCollection.find({});
    });
	
	Meteor.publish('allMessages', function() {
		return messagesCollection.find({});
	});
    
    Meteor.publish('allGames', function() {
        return gamesCollection.find({});
    });


    // secure methods for inserting, deleting, and updating messages
    Meteor.methods({
         // create a new game with one user and an empty slot 
        'gameInsert': function (newGame) {
            return gamesCollection.insert(newGame);
        },
        // add a second user to the game
        'addToGame': function(user, gameId) {
            if (Meteor.user()) {
               //update user profile
               Meteor.users.update({"_id": user._id}, {"$set": {"profile.partOfGame": gameId}});
       
               //remove from any existing game
               gamesCollection.update({"player1._id": user._id}, {"$set": {"player1": null}});
               gamesCollection.update({"player2._id": user._id}, {"$set": {"player2": null}});
       
               //add to game
               var game = gamesCollection.findOne({"_id": gameId});
               gamesCollection.update({"_id": game._id}, {"$set": {"player2": user}});
               gamesCollection.update({"_id": game._id}, {"$set": {"matchFull": true}});
               return game;
            }
            
         },
         'removeGame': function(game) {
             Meteor.users.update({"profile.partOfGame": game._id}, {$set: {"profile.partOfGame": null}});
             Meteor.users.update({"profile.partOfGame": game._id}, {$set: {"profile.partOfGame": null}});
             gamesCollection.remove({"_id": game._id});
         },
        'chooseTile': function(user, tileId) {
            if (Meteor.user()) {
                var currentGame = gamesCollection.findOne({"_id": user.profile.partOfGame});
            }
            
            // determine which player's tile is being set and update the collection
                if (currentGame.player1.username == user.username) {
                  var tile = currentGame.player1Board[tileId];
                   gamesCollection.update({"_id": user.profile.partOfGame}, {$set: {
                     "player1Tile": tile}});
                   gamesCollection.update({"_id": user.profile.partOfGame}, {$set:
                                       {"p1tileCounter": 0}});
               }
               if (currentGame.player2.username == user.username) {
                  var tile = currentGame.player2Board[tileId];
                  gamesCollection.update({"_id": user.profile.partOfGame}, {$set: {
                     "player2Tile": tile}});
                  gamesCollection.update({"_id": user.profile.partOfGame}, {$set:
                                       {"p2tileCounter": 0}});
               }

            //update the chosen card
            //Meteor.users.update({"_id": user._id}, {"$set": {"profile.cardChosen": user.profile.cardChosen}});
         },
         'incTileCounter': function(user) {
            //if (Meteor.user()) {
               var currentGame = gamesCollection.findOne({"_id": user.profile.partOfGame});
            //}
            
            if (currentGame.player1.username == user.username) {
                  gamesCollection.update({"_id": user.profile.partOfGame}, {$inc:
                                       {"p1tileCounter": 1}});
               }
                else if (currentGame.player2.username == user.username) {
                  gamesCollection.update({"_id": user.profile.partOfGame}, {$inc:
                                       {"p2tileCounter": 1}});
               }

         },
         'decTileCounter': function(user) {
            //if (Meteor.user()) {
               var currentGame = gamesCollection.findOne({"_id": user.profile.partOfGame});
            //}

            if (currentGame.player1.username == user.username) {
                  gamesCollection.update({"_id": user.profile.partOfGame}, {$inc:
                                       {"p1tileCounter": -1}});
               }
                else if (currentGame.player2.username == user.username) {
                  gamesCollection.update({"_id": user.profile.partOfGame}, {$inc:
                                       {"p2tileCounter": -1}});
               }
         },
         'incFlipped': function(user, tileId) {
            if (Meteor.user()) {
                var currentGame = gamesCollection.findOne({"_id": user.profile.partOfGame});
            }
            
            if (currentGame != null) {
               if (user.username == currentGame.player1.username) {
                  var userBoard = currentGame.player1Board;
                  userBoard[tileId].flipped = userBoard[tileId].flipped + 1;
                  gamesCollection.update({"_id": user.profile.partOfGame}, {"$set":
                     {"player1Board": userBoard}});
               } else if (user.username == currentGame.player2.username) {
                  var userBoard = currentGame.player2Board;
                  userBoard[tileId].flipped = userBoard[tileId].flipped + 1;
                  gamesCollection.update({"_id": user.profile.partOfGame}, {"$set":
                     {"player2Board": userBoard}});
               }
                
            }
         },
         'decFlipped': function(user, tileId) {
            if (Meteor.user()) {
                var currentGame = gamesCollection.findOne({"_id": user.profile.partOfGame});
            }
            
            if (currentGame != null) {
               if (user.username == currentGame.player1.username) {
                  var userBoard = currentGame.player1Board;
                  userBoard[tileId].flipped = userBoard[tileId].flipped - 1;
                  gamesCollection.update({"_id": user.profile.partOfGame}, {"$set":
                     {"player1Board": userBoard}});
               } else if (user.username == currentGame.player2.username) {
                  var userBoard = currentGame.player2Board;
                  userBoard[tileId].flipped = userBoard[tileId].flipped - 1;
                  gamesCollection.update({"_id": user.profile.partOfGame}, {"$set":
                     {"player2Board": userBoard}});
               }
                
            }
         },
        'messageInsert': function (message, gameId) {
            gamesCollection.update({"_id": gameId}, {$push: {
               "messages": message
            }});
        },
        'messageDelete': function (message) {
            messagesCollection.remove({"_id": message._id});
        },
        'messageUpdate': function (updatedMessage) {
            messagesCollection.update({"_id": updatedMessage._id}, {
                "$set": {
                    "messageText": updatedMessage.messageText
                }
            });
        },
        // increments the given field of the given user by 1
        'winsIncrement': function (user) {
            Meteor.users.update({"_id": user._id}, {
                "$inc": {
                    "profile.wins" : 1
                }
            });
        },
        'lossesIncrement': function (user) {
            Meteor.users.update({"_id": user._id}, {
                "$inc": {
                    "profile.losses" : 1
                }
            });
        }
    });


    Accounts.onCreateUser(function (options, user) {
        if (options.profile) {
            user.profile = options.profile;
        } else {
            user.profile = {};
        }
        user.profile.partOfGame = null;
		user.profile.wins = 0;
		user.profile.losses = 0;
        return user;
    });

});