var isKarma = !!window.__karma__;

if(isKarma) {
  var tests = [];

  for(var file in window.__karma__.files) {
    if(window.__karma__.files.hasOwnProperty(file)) {
      if(/-spec\.js$/.test(file)) {
        tests.push(file);
      }
    }
  }
}

require.config({
  appDir: '..',
  baseUrl: 'scripts',
  config: {
    dustc: {
      ext: '.js.dust',
      helper: 'q'
    }
  },
  paths: {
    'text': './libs/requirejs-text/js/text',
    'dustc': './libs/grunt-dustjs-linkedin/dustc',
    'jquery': './libs/jquery/jquery',
    'lodash': './libs/lodash/lodash.compat',
    'backbone': './libs/backbone/backbone',
    'q': './libs/q/js/q',
    'dust': './libs/dustjs-linkedin-helpers/js/dust-helpers',
    'dust-full': './libs/dustjs-linkedin-helpers/js/dust-helpers',
    'q/queue': './util/queue',
    'moment': './libs/moment/moment',
    'chart': './libs/chartjs/js/Chart'
  },
  shim: {
    'dust': {
      exports: 'dust',
      deps: [
        './libs/dustjs-linkedin/js/dust-core'
      ]
    },
    'dust-full': {
      exports: 'dust',
      deps: [
        './libs/dustjs-linkedin/js/dust-full'
      ]
    }
  },
  map: {
    backbone: {
      'underscore': 'lodash'
    }
  },
  stubModules: [
    'dustc',
    'text'
  ]
});

if(!isKarma) {
  require(['./app'], function(app) {
    app();
  });
}
else {
  var config = requirejs.s.contexts._.config;
  config.baseUrl = '/base/src/scripts';
  config.deps = tests;
  config.callback = window.__karma__.start;
  require.config(config);
}