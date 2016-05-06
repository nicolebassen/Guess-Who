// Nicole Bassen and Kimberly Praxel
// Guess Who? Meteor website

var tiles = [
	{
		name: "Kim",
		frontImage: "kim.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Nicole",
		frontImage: "nicole.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Chris",
		frontImage: "christopher.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Richard",
		frontImage: "richard.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Kim",
		frontImage: "kim.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Nicole",
		frontImage: "nicole.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Chris",
		frontImage: "christopher.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Richard",
		frontImage: "richard.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Kim",
		frontImage: "kim.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Nicole",
		frontImage: "nicole.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Chris",
		frontImage: "christopher.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Richard",
		frontImage: "richard.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "tileback.png",
		opponentBackImage: "redtile.png",
		clickCounter: 0
	}
];

Session.set('tile', tiles);

// keeps track of how many tiles are flipped over
var tileCounter = 0;

// store all tiles in a variable
var allTiles = Session.get('tile');

// tile that the player selects
var myTile = "tileback.png";

// computer opponent randomly selects a tile
var random = Math.floor(Math.random() * 15);
var opponentTile = allTiles[random];
console.log(opponentTile.name);

// store the three rows of tiles separately
var firstRow = [];
var secondRow = [];
var thirdRow = [];

// fill in the three rows of tiles
for (var i = 0; i < 5; i++) {
	firstRow[i] = allTiles[i];
	secondRow[i] = allTiles[i + 5];
	thirdRow[i] = allTiles[i + 10];
}

Template.mainbox.helpers({
	firstRow: function() {
		return firstRow;
	},
	secondRow: function() {
		return secondRow;
	},
	thirdRow: function() {
		return thirdRow;
	},
	myTile: function() {
		return myTile;
	}
});

Template.opponentBoard.helpers({
	firstRow: function() {
		return firstRow;
	},
	secondRow: function() {
		return secondRow;
	},
	thirdRow: function() {
		return thirdRow;
	}
});

Template.mainbox.events({
    'click .playerTile': function(event, instance) {
        if (tileCounter == 0) {
        	// myTile = ??
        }
        // if (this.clickCounter??? % 2 = 0) {
        //		this.clickCounter++		"flip tile"
        // } else {
        // 		this.clickCounter--		"unflip tile"
        // }
        tileCounter++;
        if (tileCounter == 14) {
        	console.log("Game over");
        }
        console.log(tileCounter);
    }
});





