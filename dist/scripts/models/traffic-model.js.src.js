define(['require','backbone','lodash','../models/config-model','moment'],function(require) {
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
        'Weather'
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
                totalWarnings = _.union(totalWarnings, [warning.text]);

              }
            });
          } else {
            // default segment to green if no congestion
            noCongestion += item.travelDistance;
          }
        });
      });

      return  {
        travelDurationByCongestion: {
          noCongestion: noCongestion,
          lowCongestion: lowCongestion,
          moderateCongestion: moderateCongestion,
          seriousCongestion: seriousCongestion
        },
        travelWarnings: totalWarnings
      };
    },

    _parseDurationStats: function() {
      // hours & minutes
      var totalSeconds = this.get('resourceSets')[0].resources[0].travelDurationTraffic;
      var durationObj = moment.duration({seconds: totalSeconds});
      var hoursNumber = durationObj.hours();
      durationObj.subtract({hours: hoursNumber});
      var minutesNumber = durationObj.minutes();

      // distance
      var distance = this.get('resourceSets')[0].resources[0].travelDistance;
      distance = Math.round(distance * 10) / 10;

      // arrival time
      var arriveTime = moment().add('s', totalSeconds).format('h:mm a');

      return {
        travelDurationStats: {
          hours: hoursNumber,
          minutes: minutesNumber,
          distance: distance,
          arriveTime: arriveTime
        }
      };
    },

    formatResults: function() {
      var stats = this._parseDurationStats();
      var legDetails = this._parseLegDetails();
      var results = _.extend(legDetails, stats);
      return results;
    }

  });

  return TrafficModel;
});