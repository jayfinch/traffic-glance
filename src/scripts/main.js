require.config({
  appDir: '..',
  baseUrl: 'scripts',
  paths: {
    'jquery': './libs/jquery/jquery',
    'lodash': './libs/lodash/lodash.compat',
    'backbone': './libs/backbone/backbone',
    'q': './libs/q/js/q',
    'q/queue': './util/queue',
    'dust': './libs/dustjs-linkedin-helpers/js/dust-helpers',
    'moment': './libs/moment/moment',
    'chart': './libs/chartjs/js/Chart'
  },
  shim: {
    'dust': {
      exports: 'dust',
      deps: ['./libs/dustjs-linkedin/js/dust-core']
    }
  },
  map: {
    backbone: {
      'underscore': 'lodash'
    }
  }
});

require(['./app'], function(app) {
  app();
});