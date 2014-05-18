App.MoveRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find(
      'move',
      {
        slug: params.move_slug
      }
    ).then(function (moves) {
      return moves.get('firstObject');
    });
  }
});
