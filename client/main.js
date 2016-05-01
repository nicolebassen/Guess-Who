

var tiles = [
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	},
	{
		name: "Bob",
		frontImage: "bob.jpg",
		backImage: "pam.jpg"
	}
];

Session.set('tile', tiles);

// store all tiles in a variable
var allTiles = Session.get('tile');

// store the three rows of tiles separately
var firstRow = [];
var secondRow = [];
var thirdRow = [];

for (var i = 0; i < 5; i++) {
	firstRow[i] = allTiles[i];
	secondRow[i] = allTiles[i + 5];
	thirdRow[i] = allTiles[i + 10];
}
console.log(firstRow);
console.log(secondRow);
console.log(thirdRow);

Template.mainbox.helpers({
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
    'click': function(event, instance) {
        // do something
    }
});





