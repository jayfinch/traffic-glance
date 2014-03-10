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
  },
  deps: tests,
  callback: window.__karma__.start
});