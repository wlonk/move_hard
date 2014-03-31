App.MovesNewController = Ember.ObjectController.extend({
  actions: {
    save: function () {
      var _this = this;
      var user = 1;  // Obviously, this is bad.
      var game = 1;  // Obviously, this is bad.
      var model = this.get('model');
      model.set('user', user);
      model.set('game', game);
      model.save().then(
        function (saved_model) {
          _this.transitionToRoute('move', saved_model.get('id'));
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
