App.GameRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find(
      'game',
      {
        slug: params.game_slug
      }
    ).then(function (games) {
      return games.get('firstObject');
    });
  }
});
