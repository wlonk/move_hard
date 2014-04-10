App.ApplicationAdapter = DS.DjangoRESTAdapter.extend({
  namespace: 'api/v1',
  buildStaticURL: function (path_element) {
    var host = this.get('host')
      , namespace = this.get('namespace');
    if (!host) {
        host = '';
    }
    if (!namespace) {
        namespace = '';
    } else {
        // Possibly making wrong assumptions about slashiness here?
        namespace = namespace + '/';
    }
    return host + '/' + namespace + path_element;
  }
});
