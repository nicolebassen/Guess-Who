/*
 	Nicole Bassen and Kimberly Praxel
 	Guess Who? Meteor website
*/

// import the mongo object
import { Mongo } from "meteor/mongo";

// export access to my collections
// const: cannot re-assign
export const messagesCollection = new Mongo.Collection("messages"); // stores messages
export const gamesCollection = new Mongo.Collection("games"); // stores game data


/* MESSAGES DATA */


 export const messagesData = [
 {
 name: "Guess Who Game",
 messageText: "Join a game to send messages to your opponent."
 }
 ];
