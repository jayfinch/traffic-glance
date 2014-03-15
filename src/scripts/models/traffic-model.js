define(function(require) {
	var Backbone = require('backbone');
	var _ = require('lodash');

	var TravelRouteModel = Backbone.Model.extend({
		urlRoot: '/data/CA.json',

		getTravelDurationByCongestion: function() {
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
								// TODO: log error
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

		getTravelDurationTotalWithTraffic: function() {
			return this.get('resourceSets')[0].resources[0].travelDuration;
		}

	});

	return TravelRouteModel;
});