import { Meteor } from 'meteor/meteor';
import { tilesCollection } from '../collections/collections.js';
import { usersCollection } from '../collections/collections.js';
import { messagesCollection } from '../collections/collections.js';
import { tilesData } from '../collections/collections.js';
//import ( usersDummyData } from '../collections/collections.js';
import { messagesDummyData } from '../collections/collections.js';

Meteor.startup(() => {
  // remove any database values that are present
  messagesCollection.remove({}); 	// delete all records (only works on server side)
  tilesCollection.remove({});
  
  // add tiles data to tiles collection
  for (var i = 0; i < 15; i++) {
  	tilesCollection.insert(tilesData[i]);
  }
  
  // add users dummy data to users collection
  /*
  for (var i = 0; i < usersDummyData.length; i++) {
  	usersCollection.insert(usersDummyData[i]);
  }*/
  
  // add messages dummy data to messages collection
  for (var i = 0; i < messagesDummyData.length; i++) {
  	messagesCollection.insert(messagesDummyData[i]);
  } 
});


// LATER - publish Collections data
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
