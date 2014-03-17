define(function(require) {
  var Backbone = require('backbone');
  var _ = require('lodash');
  var RouteTemplate = require('../templates/route');
  var TrafficModel = require('../models/traffic-model');
  var ChartView = require('./chart-view');

  var RouteView = Backbone.View.extend({

    className: 'route col-sm-6 col-md-4',

    initialize: function() {
      this.listenTo(this.model, 'change:travelDurationStats', this.render);
    },

    events: {
      'click .refresh': 'onClickRefresh',
      'click canvas': 'onClickRefresh'
    },

    // Rendering

    render: function() {
      this.$el.html(RouteTemplate.renderSync(this.model.toJSON()));

      // render chart
      if(this.model.get('travelDurationByCongestion')) {
        var chartView = new ChartView({
          el: this.$('.chart'),
          model: this.model
        });
        chartView.render();
      }

      // render loading
      if(this.model.get('fetchingTraffic')) {
        this.$('img').addClass('rotate');
      }

      return this;
    },

    // Events

    onFetchSuccess: function(trafficModel) {
      this.model.set({
        travelDurationStats: trafficModel.travelDurationStats(),
        travelDurationByCongestion: trafficModel.travelDurationByCongestion(),
        fetchingTraffic: false
      });
    },

    onFetchError: function() {
      // console.log('error');
    },

    // UI Events

    onClickRefresh: function(event) {
      event.preventDefault();
      this.fetchTrafficData();
    },

    // Methods

    fetchTrafficData: function() {
      if(!this.model.get('fetchingTraffic')) {

        this.model.set({
          travelDurationStats: false,
          travelDurationByCongestion: false,
          fetchingTraffic: true
        });

        var trafficModel = new TrafficModel({
          coords: this.model.get('segments')
        });

        trafficModel.fetch({
          dataType : 'jsonp',
          jsonp: 'jsonp',
          success: _.bind(this.onFetchSuccess, this),
          error: _.bind(this.onFetchError, this)
        });
      }
    }

  });

  return RouteView;
});