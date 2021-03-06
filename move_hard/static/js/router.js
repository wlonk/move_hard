App.Router.map(function() {

  this.route('index', {path: '/'});

  this.route('auth', { path: '/login' });

  this.resource('moves', {path: '/moves'}, function () {
    this.route('new', {path: '/new'});
  });
  this.resource('move', {path: '/moves/:move_slug'});

  this.resource('games', {path: '/games'});
  this.resource('game', {path: '/games/:game_slug'});

  this.resource('users', {path: '/users'});
  this.resource('user', {path: '/users/:user_username'});

});

App.Router.reopen({
  location: 'history'
});

App.ApplicationRoute = Ember.Route.extend({
  init: function () {
    this._super();
    this.controllerFor('auth').set('token', localStorage.moveHard_auth_token);
    this.controllerFor('auth').set('user_id', localStorage.moveHard_user_id);
    this.controllerFor('auth').setupAjax();
    this.controllerFor('auth').setCurrentUser();
  },
  actions: {
    logout: function () {
      this.controllerFor('auth').set('token', null);
      this.controllerFor('auth').set('user_id', null);
      this.transitionTo('index');
    }
  }
});

App.RestrictedRoute = Ember.Route.extend({
  beforeModel: function (transition) {
    if (!this.controllerFor('auth').get('hasValidToken')) {
      var loginController = this.controllerFor('auth');
      loginController.set('previousTransition', transition);
      this.transitionTo('auth');
    }
  }
});
