define(['require','backbone'],function(require) {
  var Backbone = require('backbone');

  var RouteModel = Backbone.Model.extend({

    defaults: {
      name: '',
      url: '',
      segments: [],
      units: '',
      fetchingTraffic: false
    }

  });

  return RouteModel;
});