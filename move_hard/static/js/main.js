App = Ember.Application.create();

Ember.TextField.reopen({
  attributeBindings: ['autofocus']
});
