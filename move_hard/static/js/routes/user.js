App.UserRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find(
      'user',
      {
        username: params.user_username
      }
    ).then(function (users) {
      return users.get('firstObject');
    });
  }
});
