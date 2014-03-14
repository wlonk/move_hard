App.Router.map(function() {
  this.resource('moves', { path: '/' });
  this.resource('move', {path: '/:move_id'})
});
