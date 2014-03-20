define(function(require) {
  var Backbone = require('backbone');
  var Q = require('q');
  var Queue = require('q/queue');
  var _ = require('lodash');
  var RouteTemplate = require('../templates/route');
  var TrafficModel = require('../models/traffic-model');
  var ChartView = require('./chart-view');

  var RouteView = Backbone.View.extend({

    className: 'route col-sm-6 col-md-4',

    events: {
      'click .refresh': 'onClickRefresh',
      'click canvas': 'onClickRefresh'
    },

    // Rendering

    render: function() {
      var deferred = Q.defer();

      this.$el.html(RouteTemplate.renderSync(this.model.toJSON()));

      // render chart
      if(this.model.get('travelDurationByCongestion')) {
        var chartView = new ChartView({
          el: this.$('.chart'),
          model: this.model
        });
        return chartView.render();
      } else {
        deferred.resolve();
      }

      // render loading
      if(this.model.get('fetchingTraffic')) {
        this.$('img').addClass('rotate');
      }

      return deferred.promise;
    },

    // UI Events

    onClickRefresh: function(event) {
      event.preventDefault();
      this.updateRouteWithTraffic();
    },

    // Methods

    updateRouteWithTraffic: function() {
      if(!this.model.get('fetchingTraffic')) {
        this.clearTrafficData();
        this.disableFetching();
        this.render();

        this.fetchTrafficModel()
        .then(_.bind(this.populateTrafficData, this))
        .then(_.bind(this.queueRenderTask, this))
        .then(_.bind(this.enableFetching, this))
        .fail(function(error) {
          console.log(error);
        })
        .done();
      }
    },

    queueRenderTask: function() {
      return RouteView.addTask(_.bind(this.render, this));
    },

    fetchTrafficModel: function() {
      var deferred = Q.defer();

      var trafficModel = new TrafficModel({
        coords: this.model.get('segments')
      });

      trafficModel.fetch({
        dataType : 'jsonp',
        jsonp: 'jsonp',
        success: _.bind(function() {
          deferred.resolve(trafficModel);
        }, this),
        error: _.bind(function(xhr, status, error) {
          deferred.reject(new Error(error));
        }, this)
      });

      return deferred.promise;
    },

    clearTrafficData: function() {
      this.model.set({
        travelDurationStats: false,
        travelDurationByCongestion: false,
        travelWarnings: []
      });
    },

    populateTrafficData: function(model) {
      var results = model.formatResults();

      this.model.set({
        travelDurationStats: results.travelDurationStats,
        travelDurationByCongestion: results.travelDurationByCongestion,
        travelWarnings: results.travelWarnings
      });
    },

    disableFetching: function() {
      this.model.set({
        fetchingTraffic: true
      });
    },

    enableFetching: function() {
      this.model.set({
        fetchingTraffic: false
      });
    }

  });

  RouteView.staticQueue = new Queue();
  RouteView.staticQueue.put();

  RouteView.addTask = function(task) {
    return RouteView.staticQueue.get()
    .then(task)
    .fin(RouteView.staticQueue.put);
  };

  return RouteView;
});