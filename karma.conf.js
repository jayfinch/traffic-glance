module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
      'requirejs',
      'mocha',
      'sinon-chai'
    ],
    files: [
      'dist/scripts/main.js',
      {pattern: 'dist/**/*.js', included: false},
      {pattern: 'test/**/*.js', included: false}
    ],
    reporters: [
      'progress'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      'PhantomJS',
      'Chrome',
      'Safari',
      'Firefox'
    ],
    captureTimeout: 60000,
    singleRun: false
  });
};