

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
/*
Router.onBeforeAction(function() {
    // make sure the user is logged in
    if (!Meteor.user() && !Meteor.loggingIn()) {
        // send to login page if not logged in or logging in
        this.redirect('/login');
    } else {
        // must include
        this.next(); // tells the router to continue with its business
    }
}, {
    except: ['login']
});*/