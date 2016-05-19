// import the mongo object
import { Mongo } from "meteor/mongo";

// export access to my collections
// const: cannot re-assign
export const tilesCollection = new Mongo.Collection("tiles");
export const messagesCollection = new Mongo.Collection("messages");
export const usersCollection = new Mongo.Collection("users");

// export access to any data to start our application
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

export const usersDummyData = [
	{
		name: "username1",
		wins: 0,
		losses: 0,
		online: true
	},
	{
		name: "username2",
		wins: 0,
		losses: 0,
		online: false
	},
	{
		name: "username3",
		wins: 0,
		losses: 0,
		online: true
	},
	{
		name: "username4",
		wins: 0,
		losses: 0,
		online: true
	},
	{
		name: "username5",
		wins: 0,
		losses: 0,
		online: false
	},
	{
		name: "username6",
		wins: 0,
		losses: 0,
		online: false
	}
];

export const messagesDummyData = [
	{
		name: "Guess Who",
		message: "Use this panel to send messages to your opponent!"
	}
];