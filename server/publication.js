/**
 * Created by TheMightyMacBook on 5/19/16.
 */


import {messagesCollection} from '../collection/collection.js';

Meteor.publish('messages', function(){
    return MessagesCollection.find({});
});
