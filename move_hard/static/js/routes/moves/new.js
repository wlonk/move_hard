App.MovesNewRoute = App.RestrictedRoute.extend({
  model: function (params) {
    return this.store.createRecord('move');;
  },
  setupController: function (controller, model) {
    controller.set('content', model);
    controller.set('model', model);
  },
  deactivate: function (transition) {
    this.modelFor("movesNew").rollback();
  }
});
