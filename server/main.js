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


Accounts.onCreateUser(function (options, user) {
    if (options.profile){
        user.profile = options.profile;
    }else{
        user.profile = {};
    }
    return user;
});