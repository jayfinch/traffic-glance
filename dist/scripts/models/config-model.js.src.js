define(['require','backbone','lodash'],function(require) {
  var Backbone = require('backbone');
  var _ = require('lodash');

  var instance;
  var ConfigModel = Backbone.Model.extend({

    defaults: {
      key: 'no-key-defined',
      units: 'mi',
      childViews: []
    },

    url: function() {
      return this.relPath() + 'config.json';
    },

    routes: function() {
      var routeParameterRx = /&rtp=([^&]+)/;
      var segmentInfoRx = /(\w*).([\d-.]+)_([\d-.]+)/;

      var dirtyRoutes = this.get('routes');
      var cleanRoutes = [];

      // harvest each url for its route information
      _.each(dirtyRoutes, function(dirtyRoute) {
        var cleanName = dirtyRoute.name;
        var cleanStart = dirtyRoute.startTime;
        var cleanEnd = dirtyRoute.endTime;
        var cleanUrl = dirtyRoute.url;
        var cleanSegments = [];

        var matches = routeParameterRx.exec(dirtyRoute.url);
        var routeSegments = matches[1].split('~');

        // parse each path segment
        _.each(routeSegments, function(segment) {
          var segmentInfo = segmentInfoRx.exec(segment);
          var waypointType = (segmentInfo[1] === 'pos') ? 'wp' : 'vwp';

          // final path segment
          var cleanSegment = {
            type: waypointType,
            coordLat: segmentInfo[2],
            coordLong: segmentInfo[3]
          };

          cleanSegments.push(cleanSegment);
        });

        // final route
        var cleanRoute = {
          name: cleanName,
          url: cleanUrl,
          segments: cleanSegments,
          startTime: cleanStart,
          endTime: cleanEnd
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