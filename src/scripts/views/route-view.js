define(function(require) {
  var Backbone = require('backbone');
  var RouteTemplate = require('../templates/route');
  var TrafficModel = require('../models/traffic-model');
  var ChartView = require('./chart-view');

  var RouteView = Backbone.View.extend({

    className: 'route col-sm-6 col-md-4',
    trafficModel: null,

    initialize: function() {
      this.trafficModel = new TrafficModel({
        coords: this.model.get('segments')
      });
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.trafficModel, 'change', this.onTrafficModelChange);
    },

    events: {
      'click .refresh': 'onClickRefresh',
      'click canvas': 'onClickRefresh'
    },

    // Rendering

    render: function() {
      var chartView = new ChartView({
        model: this.model
      });

      this.$el.html(RouteTemplate.renderSync(this.model.toJSON()));
      this.$('.chart').html(chartView.render().el);

      return this;
    },

    // Events

    onTrafficModelChange: function() {
      this.model.set({
        travelDurationStats: this.trafficModel.travelDurationStats(),
        travelDurationByCongestion: this.trafficModel.travelDurationByCongestion()
      });
    },

    // UI Events

    onClickRefresh: function(event) {
      event.preventDefault();
      this.model.unset('travelDurationStats', {silent: true});
      this.model.unset('travelDurationByCongestion', {silent: true});
      this.render();
      this.$('img').addClass('rotate');
      this.fetchTrafficData();
    },

    // Methods

    fetchTrafficData: function() {
      this.trafficModel.fetch({
        dataType : 'jsonp',
        jsonp: 'jsonp'
      });
    }

  });

  return RouteView;
});