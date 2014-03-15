define(function(require) {
  var Backbone = require('backbone');
  var RouteTemplate = require('../templates/route');
  var TrafficModel = require('../models/traffic-model');
  require('../libs/chart');

  var RouteView = Backbone.View.extend({

    RED_CLR: '#e01e1b',
    ORANGE_CLR: '#feaf01',
    GREEN_CLR: '#6ec43f',
    trafficModel: null,

    initialize: function() {
      this.trafficModel = new TrafficModel({
        coords: this.model.get('segments')
      });
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.trafficModel, 'change', this.onTrafficModelChange);
    },

    events: {
      'click .refresh': 'onClickRefresh'
    },

    // Rendering

    render: function() {
      this.$el.html(RouteTemplate.renderSync(this.model.toJSON()));

      var congestionData = this.model.get('travelDurationByCongestion');

      if(congestionData) {
        this.renderPieChart(congestionData);
      }

      return this;
    },

    renderPieChart: function(data) {
      var colorizedData = [
        {
          value: data.high,
          color: this.RED_CLR
        },
        {
          value : data.medium,
          color : this.ORANGE_CLR
        },
        {
          value : data.low,
          color : this.GREEN_CLR
        }
      ];

      var options = {
        animation: true,
        animateRotate: false,
        animateScale: true,
        percentageInnerCutout: 45,
        animationSteps: 40,
        segmentStrokeWidth: 1,
        segmentStrokeColor: '#3f474f'
      };

      var canvasContext = this.$('canvas')[0].getContext('2d');
      var myDoughnut = new Chart(canvasContext);
      myDoughnut.Doughnut(colorizedData, options);
    },

    // Events

    onTrafficModelChange: function() {
      this.model.set({
        travelDurationTotal: this.trafficModel.travelDurationTotal(),
        travelDurationByCongestion: this.trafficModel.travelDurationByCongestion()
      });
    },

    // UI Events

    onClickRefresh: function(event) {
      event.preventDefault();
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