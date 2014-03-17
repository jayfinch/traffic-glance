define(function(require) {
  var Backbone = require('backbone');
  require('../libs/chart');

  var ChartView = Backbone.View.extend({

    RED_CLR: '#e01e1b',
    ORANGE_CLR: '#feaf01',
    GREEN_CLR: '#45c43f',
    LIGHTGREEN_CLR: '#aac42f',

    // Rendering

    render: function() {
      var congestionData = this.model.get('travelDurationByCongestion');
      this.renderPieChart(congestionData);
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
          color : this.LIGHTGREEN_CLR
        },
        {
          value : data.none,
          color : this.GREEN_CLR
        }
      ];

      var options = {
        animation: true,
        animateRotate: false,
        animateScale: true,
        percentageInnerCutout: 45,
        animationSteps: 40,
        segmentStrokeWidth: 2,
        segmentStrokeColor: '#3f474f'
      };

      var canvasContext = this.$('canvas')[0].getContext('2d');
      var myDoughnut = new Chart(canvasContext);

      myDoughnut.Doughnut(colorizedData, options);
    }

  });

  return ChartView;
});