App.Move = DS.Model.extend({
  name: DS.attr('string'),
  body: DS.attr('string'),
  created: DS.attr(),
  user: DS.attr(),
  game: DS.attr()
});
