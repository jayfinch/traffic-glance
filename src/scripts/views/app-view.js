define(function(require) {
  var Backbone = require('backbone');
  var _ = require('lodash');
  var AppTemplate = require('../templates/app');
  var ConfigModel = require('../models/config-model');
  var RouteModel = require('../models/route-model');
  var RouteView = require('./route-view');

  var AppView = Backbone.View.extend({

    className: 'container',

    initialize: function() {
      this.configModel = new ConfigModel();
      this.listenTo(this.configModel, 'change', this.onModelChange);
    },

    render: function() {
      this.$el.html(AppTemplate.renderSync());
      return this;
    },

    renderRoutes: function() {
      var routes = this.configModel.routes();

      _.each(routes, function(route) {
        var model = new RouteModel(route);
        var view = new RouteView({
          model: model
        });
        this.$('#routes').append(view.render().el);
      });
    },

    bootstrap: function() {
      this.configModel.fetch();
    },

    onModelChange: function() {
      this.renderRoutes();
    }

  });

  return AppView;
});