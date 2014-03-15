define(function(require) {
  var Backbone = require('backbone');
  var PieChartTemplate = require('../templates/chart');
  require('../libs/chart');

  var RouteView = Backbone.View.extend({

    RED_CLR: '#e01e1b',
    ORANGE_CLR: '#feaf01',
    GREEN_CLR: '#6ec43f',

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Rendering

    render: function() {
      this.$el.html(PieChartTemplate.renderSync(this.model.toJSON()));

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
        segmentStrokeWidth: 4,
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
    }
  });

  return RouteView;
});