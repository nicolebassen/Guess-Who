/*
 	Nicole Bassen and Kimberly Praxel
 	Guess Who? Meteor website
 */

import { Meteor } from 'meteor/meteor';
import { tilesCollection } from '../collections/collections.js';
import { usersCollection } from '../collections/collections.js';
import { messagesCollection } from '../collections/collections.js';
import { tilesData } from '../collections/collections.js';
import { usersDummyData } from '../collections/collections.js';
import { messagesData } from '../collections/collections.js';

Meteor.startup(() => {
  // remove any database values that are present
  messagesCollection.remove({});
  tilesCollection.remove({});

  
  // add tiles data to tiles collection
  for (var i = 0; i < tilesData.length; i++) {
  	tilesCollection.insert(tilesData[i]);
  }

    /*

    Commented out so you can do what you need with it

  // add users dummy data to users collection
  for (var i = 0; i < usersDummyData.length; i++) {
  	usersCollection.insert(usersDummyData[i]);
  }
  */


  // add messages data to messages collection
  for (var i = 0; i < messagesData.length; i++) {
  	messagesCollection.insert(messagesData[i]);
  } 
});


// TO DO LATER - publish Collections data
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

Accounts.onCreateUser(function (options, user) {
    if (options.profile){
        user.profile = options.profile;
    }else{
        user.profile = {};
    }
    return user;
});
