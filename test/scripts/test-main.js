var tests = [];

for(var file in window.__karma__.files) {
  if(window.__karma__.files.hasOwnProperty(file)) {
    if(/-spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
  baseUrl: '/base/dist/scripts',
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
  },
  deps: tests,
  callback: window.__karma__.start
});