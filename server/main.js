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

	 
	Meteor.publish('allUsers', function() {
        //all users
        return Meteor.users.find({});
    });
	
	// tracks online status of users
	Meteor.publish("userStatus", function() {
	  return Meteor.users.find({ "status.online": true });
	});
	
    Meteor.publish('messageInsert', function () {
        //sort by most recent changes
        return messagesCollection.find({public: true});
    });



// secure methods for inserting, deleting, and updating messages
    Meteor.methods({

        'messageInsert': function (message) {
            messagesCollection.insert({
                public: true,
                name: message.name,
                messageText: message.message,
				time: message.time
            });
        },
        messageDelete: function (message) {
            messagesCollection.remove({"_id": message._id});
        },
        messageUpdate: function (updatedMessage) {
            messagesCollection.update({"_id": updatedMessage._id}, {
                "$set": {
                    "messageText": updatedMessage.messageText
                }
            });
        },

        'playerMessages': function (message) {
            messagesCollection.insert({
                public: true,
                name: message.name,
                messageText: message.message,
				time: message.time
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