

// define routes
Router.route('/', function() {
    this.render('home');
});

Router.route('/game', function() {
    this.render('game');
});

Router.route('/instructions', function() {
    this.render('instructions');
});