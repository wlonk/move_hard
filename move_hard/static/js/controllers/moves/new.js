App.MovesNewController = Ember.ObjectController.extend({
  needs: ['auth'],
  games: function () {
    // @todo this should have a null option at the beginning.
    return this.store.find('game');
  }.property(),
  selectedGame: null,
  actions: {
    save: function () {
      var self = this;

      // Get the model for future use.
      var model = this.get('model');

      // Get currently logged in user:
      var authController = this.get('controllers.auth');
      var user = authController.model;  // @todo: this should get checked by the server.

      // Can't yet set promises as relationships, so begin the nesting.
      this.store.find('game', this.get('selectedGame')).then(
        function (game) {
          model.setProperties({
            game: game,
            user: user,
            created: moment().toJSON()
            // created: new Date()
          });
        }).then(function () {
          return model.save();
        }).then(
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
