define(function(require) {
	var Backbone = require('backbone');
	var _ = require('lodash');
	var ConfigModel = require('../models/config-model');

	var TrafficModel = Backbone.Model.extend({

		initialize: function(options) {
			this.coords = options.coords;
		},

		url: function() {
			var string = 'http://dev.virtualearth.net/REST/V1/Routes/Driving?&';
			_.each(this.coords, function(coord, index) {
				string = string + coord.type + '.' + index + '=' + coord.coordLat + ',' + coord.coordLong + '&';
			});
			string = string + 'key=' + ConfigModel.instance().get('key');
			return string;
    },

		travelDurationByCongestion: function() {
			var itineraryItems = this.get('resourceSets')[0].resources[0].routeLegs[0].itineraryItems;
			var total = 0;
			var low = 0;
			var medium = 0;
			var high = 0;

			_.each(itineraryItems, function(item) {
				if (item.warnings) {
					_.each(item.warnings, function(warning) {
						if (warning.warningType === 'TrafficFlow') {
							switch(warning.severity) {
							case 'Low Impact':
								low = low + item.travelDuration;
								break;
							case 'Minor':
								medium = medium + item.travelDuration;
								break;
							case 'Moderate':
								medium = medium + item.travelDuration;
								break;
							case 'Serious':
								high = high + item.travelDuration;
								break;
							default:
								// todo: log error
								low = low + item.travelDuration;
							}
						}
					});
				} else {
					low = low + item.travelDuration;
				}

				total = {
					high: high,
					medium: medium,
					low: low
				};
			});

			return total;
		},

		travelDurationTotal: function() {
			return this.get('resourceSets')[0].resources[0].travelDuration;
		}

	});

	return TrafficModel;
});