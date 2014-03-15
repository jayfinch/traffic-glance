define(function(require) {
  var Backbone = require('backbone');
  var _ = require('lodash');

  var instance;
  var ConfigModel = Backbone.Model.extend({

    url: function() {
      return this.relPath() + 'config.json';
    },

    routes: function() {
      var routeParameterRx = /&rtp=([^&]+)/;
      var segmentInfoRx = /(\w*).([\d-.]+)_([\d-.]+)/;

      var dirtyRoutes = this.get('routes');
      var cleanRoutes = [];

      _.each(dirtyRoutes, function(dirtyRoute) {
        var cleanName = dirtyRoute.name;
        var cleanUrl = dirtyRoute.url;
        var cleanSegments = [];

        // segments
        var matches = routeParameterRx.exec(dirtyRoute.url);
        var routeSegments = matches[1].split('~');

        _.each(routeSegments, function(segment) {
          var segmentInfo = segmentInfoRx.exec(segment);
          var waypointType = (segmentInfo[1] === 'pos') ? 'wp' : 'vwp';

          var cleanSegment = {
            type: waypointType,
            coordLat: segmentInfo[2],
            coordLong: segmentInfo[3]
          };

          cleanSegments.push(cleanSegment);
        });

        // final
        var cleanRoute = {
          name: cleanName,
          url: cleanUrl,
          segments: cleanSegments
        };

        cleanRoutes.push(cleanRoute);
      });

      return cleanRoutes;
    },

    relPath: function() {
      var locationPathname = window.location.pathname;
      var path;

      if ('/' !== locationPathname) {
        path = locationPathname.substring(0, locationPathname.indexOf('/', 1) + 1);
      } else {
        path = locationPathname;
      }
      return path + (/\/$/.test(path) ? '' : '/');
    }

  });

  ConfigModel.instance = function() {
    if (!instance) {
      instance = new ConfigModel();
      return instance;
    } else {
      return instance;
    }

  };

  return ConfigModel;
});