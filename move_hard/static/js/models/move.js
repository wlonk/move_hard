App.Move = DS.Model.extend({
  name: DS.attr('string'),
  slug: DS.attr('string'),
  body: DS.attr('string'),
  created: DS.attr(''),  // Dates are borked
  user: DS.belongsTo('user'),
  game: DS.belongsTo('game'),

  renderedContent: function () {
    var body = this.get('body');
    if (!!body) {
      var converter = Markdown.getSanitizingConverter();
      return converter.makeHtml(this.get('body'));
    } else {
      return ''
    }
  }.property('body')
});
