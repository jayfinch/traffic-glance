define(function(require) {
  var Backbone = require('backbone');
  var Q = require('q');
  var Queue = require('q/queue');
  var _ = require('lodash');
  require('../libs/chart');

  var ChartView = Backbone.View.extend({

    RED_CLR: '#e01e1b',
    ORANGE_CLR: '#feaf01',
    GREEN_CLR: '#45c43f',
    LIGHTGREEN_CLR: '#aac42f',

    // Rendering

    render: function() {
      ChartView.addTask(_.bind(this.renderPieChart, this));
      return this;
    },

    renderPieChart: function() {
      var deferred = Q.defer();
      var data = this.model.get('travelDurationByCongestion');

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

      var onRenderComplete = function () {
        deferred.resolve(true);
      };

      var options = {
        animation: true,
        animateRotate: false,
        animateScale: true,
        percentageInnerCutout: 45,
        animationSteps: 40,
        segmentStrokeWidth: 2,
        segmentStrokeColor: '#3f474f',
        onAnimationComplete: onRenderComplete
      };

      var canvasContext = this.$('canvas')[0].getContext('2d');
      var myDoughnut = new Chart(canvasContext);
      myDoughnut.Doughnut(colorizedData, options);

      return deferred.promise;
    }

  });

  ChartView.staticQueue = new Queue();
  ChartView.staticQueue.put();

  ChartView.addTask = function(task) {
    return ChartView.staticQueue.get()
    .then(task)
    .fin(ChartView.staticQueue.put);
  };

  return ChartView;
});