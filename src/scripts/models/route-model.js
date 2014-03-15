define(function(require) {
	var Backbone = require('backbone');

	var RouteModel = Backbone.Model.extend({
		defaults: {
			name: '',
			url: '',
			segments: [],
			distanceUnits: 'mi'
		}
	});

	return RouteModel;
});