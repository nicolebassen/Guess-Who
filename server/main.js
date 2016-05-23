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
});

// secure methods for inserting, deleting, and updating messages
Meteor.methods({
    messageInsert: function(message) {
        messagesCollection.insert(message);
    },
    messageDelete: function(_id) {
        messagesCollection.remove({"_id": _id});
    },
    messageUpdate: function(updatedActivity) {
        messagesCollection.update({"_id": updatedMessage._id}, {"$set": {
            "messageText": updatedMessage.messageText
        }});
    }
});

Meteor.publish('messages', function() {
    //sort by most recent changes
    return messagesCollection.find();
});

Accounts.onCreateUser(function (options, user) {
    if (options.profile){
        user.profile = options.profile;
    }else{
        user.profile = {};
    }
    return user;
});