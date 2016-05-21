/*
 	Nicole Bassen and Kimberly Praxel
 	Guess Who? Meteor website
*/

// import the mongo object
import { Mongo } from "meteor/mongo";

// export access to my collections
// const: cannot re-assign
export const tilesCollection = new Mongo.Collection("tiles");
export const messagesCollection = new Mongo.Collection("messages");

/* MESSAGES DATA */

export const messagesData = [
	{
		name: "Guess Who Game",
		messageText: "Use this panel to send messages to your opponent!"
	}
];