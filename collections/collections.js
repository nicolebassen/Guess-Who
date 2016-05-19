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
//export const usersCollection = new Mongo.Collection("users");

// export access to any data to start our application

/* TILES DATA */

export const tilesData = [
	{
		id: 0,
		name: "Kim",
		frontImage: "kim.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 1,
		name: "Nicole",
		frontImage: "nicole.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 2,
		name: "Chris",
		frontImage: "christopher.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 3,
		name: "Paige",
		frontImage: "paigegreen.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 4,
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 5,
		name: "Dinesh",
		frontImage: "dinesh.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 6,
		name: "Gilfoyle",
		frontImage: "gilfoyle.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 7,
		name: "Pam",
		frontImage: "pam.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 8,
		name: "Richard",
		frontImage: "richard.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 9,
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 10,
		name: "Kim",
		frontImage: "kim.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 11,
		name: "Nicole",
		frontImage: "nicole.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 12,
		name: "Chris",
		frontImage: "christopher.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 13,
		name: "Richard",
		frontImage: "richard.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 14,
		name: "Barbie",
		frontImage: "barbie.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		flipped: 0
	},
	{
		id: 15,
		name: "",
		frontImage: "tileback.png"
	}
];

/* USERS DUMMY DATA */


/*

 Commented out so you can do what you need with it

export const usersDummyData = [
	{
		name: "Player1",
		online: true
	},
	{
		name: "Player2",
		online: false
	},
	{
		name: "Kimberly",
		online: true
	},
	{
		name: "Nicole",
		online: true
	},
	{
		name: "Player3",
		online: false
	},
	{
		name: "Player4",
		online: false
	}
];

*/

/* MESSAGES DATA */

export const messagesData = [
	{
		name: "Guess Who",
		message: "Use this panel to send messages to your opponent!"
	}
];