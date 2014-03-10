define(function(require) {
  var $ = require('jquery');
  var AppView = require('./views/app-view');

  return function() {
    var appView = new AppView();
    $('body').html(appView.$el);
    appView.render();
  };
});