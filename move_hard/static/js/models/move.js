App.Move = DS.Model.extend({
  name: DS.attr('string'),
  body: DS.attr('string'),
  created: DS.attr(),
  user: DS.attr(),
  game: DS.attr(),

  renderedContent: function () {
    var body = this.get('body');
    if (!!body) {
      var converter = Markdown.getSanitizingConverter();
      return converter.makeHtml(this.get('body'));  // @todo: this can totally cause script injection shenanigans. Scrub it to safe tags.
    } else {
      return ''
    }
  }.property('body')
});
