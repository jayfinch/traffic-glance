define(['require','backbone','q','chart'],function(require) {
  var Backbone = require('backbone');
  var Q = require('q');
  require('chart');

  var ChartView = Backbone.View.extend({

    RED_CLR: '#e01e1b',
    ORANGE_CLR: '#fc8d0d',
    YELLOW_COLOR: '#ede725',
    GREEN_CLR: '#45c43f',

    // Rendering

    render: function() {
      var deferred = Q.defer();
      var data = this.model.get('travelDurationByCongestion');

      var colorizedData = [
        {
          value: data.seriousCongestion,
          color: this.RED_CLR
        },
        {
          value : data.moderateCongestion,
          color : this.ORANGE_CLR
        },
        {
          value : data.lowCongestion,
          color : this.YELLOW_COLOR
        },
        {
          value : data.noCongestion,
          color : this.GREEN_CLR
        }
      ];

      var onRenderComplete = function () {
        deferred.resolve();
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

  return ChartView;
});