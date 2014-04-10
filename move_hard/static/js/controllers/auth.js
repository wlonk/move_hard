App.AuthController = Ember.ObjectController.extend({
  username: null,
  password: null,
  user_id: null,
  token: null,
  errors: null,
  model: null,

  reset: function () {
    // Guard against the side-effects of App.reset()
    if (!(this.isDestroying || this.isDestroyed)) {
      this.setProperties({
        username: null,
        password: null,
        user_id: null,
        errors: null,
        model: null
      });
    }
  },

  hasValidToken: function () {
    var token = this.get('token');
    return (!Ember.isEmpty(token) && token != 'null' && token !== 'undefined');
  }.property('token'),

  hasValidUserId: function () {
    var user_id = this.get('user_id');
    return (!Ember.isEmpty(user_id) && user_id != 'null' && user_id !== 'undefined');
  }.property('user_id'),

  setupAjax: function () {
    var self = this
      , token = this.get('token');
    $(document).ajaxSend(function (event, xhr, settings) {
      if (self.get('hasValidToken')) {
        xhr.setRequestHeader("Authorization", "Token " + token);
      }
    });
  },

  setCurrentUser: function () {
    if (this.get('hasValidToken') && this.get('hasValidUserId')) {
      this.store.find('user', this.get('user_id')).then(function (currentUser) {
        this.set('model', currentUser);
      }.bind(this));
    } else {
      this.reset();
    }
  },

  setUserAttributes: function () {
    localStorage.moveHard_auth_token = this.get('token');
    localStorage.moveHard_user_id = this.get('user_id');
    this.setupAjax();
    this.setCurrentUser();
  },

  tokenChanged: function () {
    Ember.run.once(this, 'setUserAttributes');
  }.observes('token', 'user_id'),

  actions: {
    login: function () {
      var self = this;
      var data = this.getProperties('username', 'password');
      var url = self.store.adapterFor(self.store.adapter).buildStaticURL('api-token-auth/');
      $.post(url, data).then(
        function (response) {
          self.reset();
          self.set('token', response.token);
          self.set('user_id', response.user_id);
          self.transitionToRoute('index');
        },
        function (jqXHR, status, error) {
          self.set('errors', $.parseJSON(jqXHR.responseText));
        }
      );
    }
  }
});
