App.Router.map(function() {

  this.route('index', {path: '/'});

  this.route('auth', { path: '/login' });

  this.resource('moves', {path: '/moves'}, function () {
    this.route('new', {path: '/new'});
  });
  this.resource('move', {path: '/moves/:move_id'});

  this.resource('games', {path: '/games'});
  this.resource('game', {path: '/games/:game_id'});

  this.resource('users', {path: '/users'});
  this.resource('user', {path: '/users/:user_id'});

});

App.Router.reopen({
  location: 'history'
});

App.ApplicationRoute = Ember.Route.extend({
  init: function() {
    this._super();
    this.controllerFor('auth').set('token', localStorage.moveHard_auth_token);
    this.controllerFor('auth').set('user_id', localStorage.moveHard_user_id);
    this.controllerFor('auth').setupAjax();
    this.controllerFor('auth').setCurrentUser();
  },
  actions: {
    logout: function() {
      App.reset();  // This is causing an error on logout.
      this.controllerFor('auth').set('token', null);
      this.controllerFor('auth').set('user_id', null);
      this.transitionTo('index');
    }
  }
});
