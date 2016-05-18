import { Meteor } from 'meteor/meteor';
import { tilesCollection } from '../collections/collections.js';
import { tilesData } from '../collections/collections.js';
//import { messagesCollection } from '../collections/collections.js';
import { usersCollection } from '../collections/collections.js';

Meteor.startup(() => {
  // remove any database values that are present
  //tilesCollection.remove({}); 	// delete all records (only works on server side)
  
  // add tile values
  for (var i = 0; i < tilesData.length; i++) {
  	tilesCollection.insert(tilesData[i]);
  }
  
  
});

Meteor.methods({
    msgInsert: function(message) {
        message.updatedOn = new Date();
        messageCollection.insert(message);
    },
    msgDelete: function(_id) {
        activityCollection.remove({"_id": _id});
    },
    msgUpdate: function(updatedActivity) {
        messageCollection.update({"_id": updatedMesage._id}, {"$set": {
            "name": "",
            "message": "",
            "date": new Date()
        }});
    },
    getSingleMessage: function(_id) {
        return activityCollection.findOne({"_id": _id});
    }
});

/*
Meteor.publish('tiles', function() {
    //sort by most recent changes
    return tilesCollection.find();
});

Meteor.publish('messages', function() {
    //sort by most recent changes
    return messagesCollection.find();
});
*/
