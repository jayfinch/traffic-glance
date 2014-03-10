require.config({
  appDir: '..',
  baseUrl: 'scripts',
  paths: {
    'jquery': './libs/jquery',
    'lodash': './libs/lodash',
    'backbone': './libs/backbone',
    'q': './libs/q',
    'q/queue': './libs/queue',
    'dust': './libs/dust',
    'bootstrap': './libs/bootstrap'
  },
  shim: {
    'dust': {
      exports: 'dust'
    },
    'bootstrap' : {
      exports: 'jQuery',
      deps: [
        'jquery'
      ]
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