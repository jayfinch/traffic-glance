define(function(require) {
  var $ = require('jquery');
  var AppView = require('./views/app-view');

  return function() {
    var appView = new AppView();
    $('body').prepend(appView.render().el);
    appView.bootstrap();
  };
});