App.MovesController = Ember.ArrayController.extend({
  actions: {
    createMove: function() {
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      var move = this.store.createRecord('move', {
        title: "When you " + title
      });

      this.set('newTitle', '');

      move.save();

    }
  }
});
