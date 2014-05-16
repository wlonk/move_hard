App.MovesNewRoute = App.RestrictedRoute.extend({
  model: function (params) {
    return this.store.createRecord('move');
  },
  deactivate: function (transition) {
    this.modelFor("movesNew").rollback();
  }
});
