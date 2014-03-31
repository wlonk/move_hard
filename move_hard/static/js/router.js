App.Router.map(function() {

  this.route('index', {path: '/'});

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
