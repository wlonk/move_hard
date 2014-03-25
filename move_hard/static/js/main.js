var App = Ember.Application.create();

App.ApplicationAdapter = DS.DjangoRESTAdapter.extend({
  namespace: 'api/v1'
});

App.Router.reopen({
  location: 'history'
});
