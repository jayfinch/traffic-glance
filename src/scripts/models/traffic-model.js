define(function(require) {
  var Backbone = require('backbone');
  var _ = require('lodash');
  var ConfigModel = require('../models/config-model');

  var TrafficModel = Backbone.Model.extend({

    initialize: function(options) {
      this.coords = options.coords;
      this.configModel = ConfigModel.instance();
    },

    url: function() {
      var string = 'http://dev.virtualearth.net/REST/V1/Routes/Driving?&';

      string += 'distanceUnit=' + this.configModel.get('units') + '&';

      _.each(this.coords, function(coord, index) {
        string += coord.type + '.' + index + '=' + coord.coordLat + ',' + coord.coordLong + '&';
      });

      string += 'key=' + this.configModel.get('key');
      return string;
    },

    travelDurationByCongestion: function() {
      var resource = this.get('resourceSets')[0].resources[0];
      var itineraryLegs = resource.routeLegs;
      var total;
      var none = 0;
      var low = 0;
      var medium = 0;
      var high = 0;

      // each destination is a "leg"
      _.each(itineraryLegs, function(leg) {
        var itineraryItems = leg.itineraryItems;

        // each leg broken into segments
        _.each(itineraryItems, function(item) {
          if (item.warnings) {

            // examine warnings
            _.each(item.warnings, function(warning) {
              if (warning.warningType === 'TrafficFlow') {
                switch(warning.severity) {
                case 'Low Impact':
                  none += item.travelDuration;
                  break;
                case 'Minor':
                  low += item.travelDuration;
                  break;
                case 'Moderate':
                  medium += item.travelDuration;
                  break;
                case 'Serious':
                  high += item.travelDuration;
                  break;
                default:
                  none += item.travelDuration;
                }
              }
            });
          } else {
            none += item.travelDuration;
          }
        });

        total = {
          high: high,
          medium: medium,
          low: low,
          none: none
        };
      });

      return total;
    },

    travelDurationStats: function() {
      var travelDurationStats = {};
      var totalSeconds = this.get('resourceSets')[0].resources[0].travelDurationTraffic;
      var seconds = totalSeconds;

      var hours  = Math.floor( seconds / ( 60 * 60 ) );
      seconds -= hours * ( 60 * 60 );
      var minutes  = Math.floor( seconds / 60 );

      var distance = this.get('resourceSets')[0].resources[0].travelDistance;
      distance = Math.round(distance * 10) / 10;

      // build stats object
      if(hours) travelDurationStats.hours = hours;
      if(minutes) travelDurationStats.minutes = minutes;
      if(totalSeconds) travelDurationStats.totalSeconds = totalSeconds;
      if(distance) travelDurationStats.distance = distance;

      return travelDurationStats;
    }

  });

  return TrafficModel;
});