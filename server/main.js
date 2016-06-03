/*
 	Nicole Bassen and Kimberly Praxel
 	Guess Who? Meteor website
 */

import { Meteor } from 'meteor/meteor';
import { messagesCollection } from '../collections/collections.js';
import { messagesData } from '../collections/collections.js';


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
    
    Meteor.publish('allGames'), function() {
        return gamesCollection.find({});
    }


// secure methods for inserting, deleting, and updating messages
    Meteor.methods({
        
        'gameInsert': function(game) {
            return gamesCollection.insert(game);
        },
        'messageInsert': function (message) {
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
		user.profile.wins = 0;
		user.profile.losses = 0;
        return user;
    });

});