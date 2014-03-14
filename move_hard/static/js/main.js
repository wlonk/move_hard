var App = Ember.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'moves-emberjs'
});

App.Router.reopen({
  location: 'history'
});
