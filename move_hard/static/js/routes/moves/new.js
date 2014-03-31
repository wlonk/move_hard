App.MovesNewRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.createRecord('move');;
  },
  setupController: function (controller, model) {
    controller.set('content', model);
    controller.set('model', model);
  }
});
