define(function(require) {
  var Backbone = require('backbone');
  var _ = require('lodash');
  var AppTemplate = require('../templates/app');
  var ConfigModel = require('../models/config-model');
  var RouteModel = require('../models/route-model');
  var RouteView = require('./route-view');

  var AppView = Backbone.View.extend({

    childViews: [],
    configModel: null,

    initialize: function() {
      this.configModel = ConfigModel.instance();
      this.listenTo(this.configModel, 'change', this.onModelChange);
    },

    events: {
      'click .refresh-all': 'onClickRefreshAll'
    },

    // Rendering

    render: function() {
      this.$el.html(AppTemplate.renderSync());
      return this;
    },

    renderRoutes: function() {
      var self = this;
      var routes = this.configModel.routes();
      var routesDiv = this.$('#routes');
      routesDiv.empty();

      // build child views
      _.each(routes, function(route) {
        _.extend(route, {
          units: self.configModel.get('units')
        });

        var routeView = new RouteView({
          model: new RouteModel(route)
        });

        self.childViews.push(routeView);
        routesDiv.append(routeView.render().el);
      });
    },

    // Events

    onModelChange: function() {
      this.renderRoutes();
    },

    // UI Events

    onClickRefreshAll: function() {
      _.each(this.childViews, function(childView) {
        childView.fetchTrafficData();
      });
    },

    // Methods

    bootstrap: function() {
      this.configModel.fetch();
    }

  });

  return AppView;
});