App.Router.map(function() {

  this.route('index', {path: '/'});

  this.resource('moves', {path: '/moves'}, function () {
    this.route('new', {path: '/new'});
  });
  this.resource('move', {path: '/moves/:move_id'});

  this.resource('games', {path: '/games'});

  this.resource('users', {path: '/users'});

});

App.Router.reopen({
  location: 'history'
});
