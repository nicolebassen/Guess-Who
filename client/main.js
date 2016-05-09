// Nicole Bassen and Kimberly Praxel
// Guess Who? Meteor website

var tiles = [
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

Session.set('tile', tiles);

// keeps track of how many tiles are flipped over
var tileCounter = 0;

// store all tiles in a variable
var allTiles = Session.get('tile');

// tile that the player selects
var myTile = allTiles[15];
Session.set('myTile', myTile);

// computer opponent randomly selects a tile
var random = Math.floor(Math.random() * 15);
var opponentTile = allTiles[random];
console.log("The opponent's tile is: " + opponentTile.name);

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
		return Session.get('myTile');
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
    'click .playerTile': function(event) {
    	var id = event.currentTarget.id;
    	
        if (tileCounter == 0) {
        	event.preventDefault(); // prevent tile from flipping?
        	Session.set('myTile', allTiles[id]);
        	tileCounter++;
        	
        	// test
        	console.log("You chose: " + allTiles[id].id + " (" + allTiles[id].name + ")");
        } else {
        	// if image side of tile was facing up
        	if (allTiles[id].flipped % 2 == 0) {
        		allTiles[id].flipped++;	// switch flipped to true
        		tileCounter++;
        		
        		// test
        		console.log(allTiles[id].name + ": " + allTiles[id].id + ", flipped: " + 
        				allTiles[id].flipped);
        	} 
        	// if blank side of tile was facing up
        	else {
         		allTiles[id].flipped--; // switch flipped to false
         		tileCounter--;
         		
         		// test
         		console.log(allTiles[id].name + ": " + allTiles[id].id + ", flipped: " + 
         				allTiles[id].flipped);	
         	}
        }
        console.log("Tile counter: " + tileCounter);  // how many tiles are flipped over
        
        if (tileCounter >= 14) {
        	console.log("Game over");
        }  
    }
});





