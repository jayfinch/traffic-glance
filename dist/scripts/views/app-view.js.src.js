define(['require','backbone','lodash','../templates/app','../models/config-model','../models/route-model','./route-view','moment'],function(require) {
  var Backbone = require('backbone');
  var _ = require('lodash');
  var AppTemplate = require('../templates/app');
  var ConfigModel = require('../models/config-model');
  var RouteModel = require('../models/route-model');
  var RouteView = require('./route-view');
  var moment = require('moment');

  var AppView = Backbone.View.extend({

    relevantViews: [],
    nonRelevantViews: [],
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
      this.$('#routes').empty();

      // build child views
      _.each(routes, function(route) {
        _.extend(route, {
          units: self.configModel.get('units')
        });

        var routeView = new RouteView({
          model: new RouteModel(route)
        });

        // somewhat respect the original order
        var container = self.autoLoad(route) ? self.relevantViews : self.nonRelevantViews;
        container.push(routeView);

        self.renderChildViews(self.relevantViews, true);
        self.renderChildViews(self.nonRelevantViews, false);
      });
    },

    renderChildViews: function(array, fetch) {
      var routesDiv = this.$('#routes');

      _.each(array, function(view) {
        view.render()
        .then(function() {
          routesDiv.append(view.el);
          if (fetch) view.updateRouteWithTraffic();
        })
        .done();
      });
    },

    // Events

    onModelChange: function() {
      this.renderRoutes();
    },

    // UI Events

    onClickRefreshAll: function(event) {
      event.preventDefault();
      _.each(this.relevantViews, function(view) {
        view.updateRouteWithTraffic();
      });
      _.each(this.nonRelevantViews, function(view) {
        view.updateRouteWithTraffic();
      });
    },

    // Methods

    bootstrap: function() {
      this.configModel.fetch();
    },

    autoLoad: function(route) {
      var now = moment();
      var afterStart = now.isAfter(moment(route.startTime, 'h:mm a'));
      var beforeEnd = now.isBefore(moment(route.endTime, 'h:mm a'));

      return afterStart && beforeEnd ? true : false;
    }

  });

  return AppView;
});