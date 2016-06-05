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
            //update user profile
            Meteor.users.update({"_id": user._id}, {"$set": {"profile.partOfGame": gameId}});
    
            //remove from any existing game
            gamesCollection.update({"player1._id": user._id}, {"$set": {"player1": null}});
            gamesCollection.update({"player2._id": user._id}, {"$set": {"player2": null}});
    
            //add to game
            var game = gamesCollection.findOne({"_id": gameId});
    
            game.player2 = user;
    
            gamesCollection.update({"_id": game._id}, {"$set": {"player1": game.player1, "player2": game.player2}})
    
            return game;
         },
         'removeGame': function(game, opponent) {
            Meteor.users.update({"_id": Meteor.userId()}, {$set: {"profile.partOfGame": null}});
            Meteor.users.update({"username": opponent}, {$set: {"partOfGame": null}});
            gamesCollection.remove({"_id": game._id});
         },
        'updateTile': function(user) {
            //update the chosen card
            Meteor.users.update({"_id": user._id}, {"$set": {"profile.cardChosen": user.profile.cardChosen}});
    
            //update your record in the match document
            matchesCollection.update({"user1._id": user._id}, {"$set": {"user1": user}});
            matchesCollection.update({"user2._id": user._id}, {"$set": {"user2": user}});
         },
        'messageInsert': function (message) {
            //gamesCollection.insert({"})
            messagesCollection.insert({
                public: true,
                name: message.name,
                messageText: message.message,
				time: message.time
            });
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
        'winsIncrement': function (_id) {
            Meteor.users.update({"_id": _id}, {
                "$inc": {
                    "profile.wins" : 1
                }
            });
        },
        'lossesIncrement': function (_id) {
            Meteor.users.update({"_id": _id}, {
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