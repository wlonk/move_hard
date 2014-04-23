App.MovesNewController = Ember.ObjectController.extend({
  needs: ['auth'],
  games: function () {
    // @todo this should have a null option at the beginning.
    return this.store.find('game');
  }.property(),
  actions: {
    save: function () {
      var self = this;
      var user = 1;  // @todo: this should use the current user, and get checked by the server.
      var model = this.get('model');
      model.set('user', user);
      model.save().then(
        function (saved_model) {
          self.transitionToRoute('move', saved_model.get('id'));
        },
        function (reason) {
          // in case of failure:
          // display the reason.
          // make a general tool for this.
        }
      );
    }
  }
});
