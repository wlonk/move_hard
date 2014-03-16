App.Router.map(function() {
  this.resource('moves', { path: '/moves' });
  this.resource('move', {path: '/moves/:move_id'})
});
