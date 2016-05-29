

// define routes
Router.route('/', function() {
    this.render('login');
});

Router.route('/game', function() {
    this.render('game');
});

Router.route('/instructions', function() {
    this.render('instructions');
});