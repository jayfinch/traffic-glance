define(function(require) {
  var Backbone = require('backbone');
  var _ = require('lodash');
  var ConfigModel = require('../models/config-model');
  var moment = require('moment');

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

    _parseLegDetails: function() {
      var warningWhitelist = [
        'Accident',
        'BlockedRoad',
        'Congestion',
        'DisabledVehicle',
        'Miscellaneous',
        'Other',
        'OtherTrafficIncidents',
        'PlannedEvents',
        'RoadClosures',
        'RoadHazard',
        'ScheduledConstruction',
        'SeasonalClosures',
        'Weather',
      ];

      var resource = this.get('resourceSets')[0].resources[0];
      var itineraryLegs = resource.routeLegs;

      var totalWarnings = [];
      var noCongestion = 0;
      var lowCongestion = 0;
      var moderateCongestion = 0;
      var seriousCongestion = 0;

      // each hard destination is a "leg"
      _.each(itineraryLegs, function(leg) {
        var itineraryItems = leg.itineraryItems;

        // each leg broken into segments
        _.each(itineraryItems, function(item) {

          if (item.warnings) {
            _.each(item.warnings, function(warning) {
              if (warning.warningType === 'TrafficFlow') {

                // add up distance by congestion
                switch(warning.severity) {
                case 'Minor':
                  lowCongestion += item.travelDistance;
                  break;
                case 'Low Impact':
                  lowCongestion += item.travelDistance;
                  break;
                case 'Moderate':
                  moderateCongestion += item.travelDistance;
                  break;
                case 'Serious':
                  seriousCongestion += item.travelDistance;
                  break;
                default:
                  noCongestion += item.travelDistance;
                }
              } else if(_.contains(warningWhitelist, warning.warningType)){

                // capture non-congestion warnings
                totalWarnings.push(warning.text);
              }
            });
          } else {
            // default to green
            noCongestion += item.travelDistance;
          }
        });
      });

      var results =  {
        totalCongestion: {
          noCongestion: noCongestion,
          lowCongestion: lowCongestion,
          moderateCongestion: moderateCongestion,
          seriousCongestion: seriousCongestion
        },
        totalWarnings: totalWarnings
      };

      return results;
    },

    _parseDurationStats: function() {
      var totalSeconds = this.get('resourceSets')[0].resources[0].travelDurationTraffic;
      var arriveTime = moment().add('s', totalSeconds).format('h:mm a');
      var seconds = totalSeconds;

      var hours  = Math.floor( seconds / ( 60 * 60 ) );
      seconds -= hours * ( 60 * 60 );
      var minutes  = Math.floor( seconds / 60 );

      var distance = this.get('resourceSets')[0].resources[0].travelDistance;
      distance = Math.round(distance * 10) / 10;

      // build stats object
      var travelDurationStats = {
        hours: hours,
        minutes: minutes,
        totalSeconds: totalSeconds,
        distance: distance,
        arriveTime: arriveTime
      };

      return travelDurationStats;
    },

    formatResults: function() {
      var legDetails = this._parseLegDetails();
      return {
        travelDurationStats: this._parseDurationStats(),
        travelDurationByCongestion: legDetails.totalCongestion,
        travelWarnings: legDetails.totalWarnings
      };
    }

  });

  return TrafficModel;
});