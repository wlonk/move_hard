App.MovesIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('move');
  }
});
