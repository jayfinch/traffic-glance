define(function(require) {
  var Backbone = require('backbone');
  var RouteTemplate = require('../templates/route');
  var RouteModel = require('../models/route-model');
  require('../libs/chart');

  var AppView = Backbone.View.extend({

    RED_CLR: '#e01e1b',
    ORANGE_CLR: '#feaf01',
    GREEN_CLR: '#6ec43f',

    initialize: function() {
      var myModel = new RouteModel();

      this.listenTo(myModel, 'change', this.onModelChange);
    },

    render: function() {
      this.$el.html(RouteTemplate.renderSync(this.model.toJSON()));
      return this;
    },

    onModelChange: function(model) {
      // console.log('total: ' + model.getTravelDurationTotalWithTraffic());
      var data = model.getTravelDurationByCongestion();
      this.chartIt(data);
    },

    chartIt: function(data) {
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


    }

  });

  return AppView;
});