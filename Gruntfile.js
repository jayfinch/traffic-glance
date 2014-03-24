module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: [
        'dist'
      ]
    },
    bower: {
      build: {
        options: {
          targetDir: './src/scripts/libs',
          cleanup: true,
          layout: 'byComponent'
        }
      }
    },
    copy: {
      build : {
        expand: true,
        cwd: 'src',
        src: '**',
        dest: 'dist',
        filter: 'isFile'
      }
    },
    less: {
      options: {
        compress: true,
        sourceMap: true
      },
      build: {
        expand: true,
        cwd: 'src',
        src: '**/*.css.less',
        dest: 'dist',
        ext: '.css',
        filter: 'isFile'
      }
    },
    dust: {
      options: {
        wrapper: 'amd',
        helper: 'q',
        dependencies: {
          dust: 'dust',
          Q: 'q'
        }
      },
      build: {
        expand: true,
        cwd: 'src',
        src: '**/*.js.dust',
        dest: 'dist',
        ext: '.js',
        filter: 'isFile'
      }
    },
    requirejs: {
      build: {
        options: {
          mainConfigFile: 'src/scripts/main.js',
          dir: 'dist',
          name: 'main',
          optimize: 'uglify2',
          keepBuildDir: true,
          generateSourceMaps: true,
          preserveLicenseComments: false,
          optimizeCss: false
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      build: [
        'src/**/*.js',
        'test/**/*.js'
      ]
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      build: {
        expand: true,
        cwd: 'src',
        src: '**/*.html',
        dest: 'dist',
        ext: '.html',
        filter: 'isFile'
      }
    },
    karma: {
      build: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: [
          'PhantomJS'
        ]
      }
    },
    watch: {
      options: {
        interupt: true
      },
      build: {
        files: 'src/**',
        tasks: [
          'default'
        ]
      }
    },
    connect: {
      src: {
        options: {
          base: 'src',
          keepalive: true,
          middleware: function(connect, options, middlewares) {
            middlewares.push(function(req, res, next) {
              var less = require('grunt-contrib-less/node_modules/less');
              var url = req.url;
              var path = require('path');
              var Q = require('q');
              var fs = require('fs');
              var masterConfig = grunt.config();
              if(path.extname(url) !== masterConfig.less.build.ext) return next();
              var baseDir = options.base[0];
              var opts = grunt.config().less.options;
              opts.paths = [path.join(baseDir, path.dirname(url))];
              var parser = new less.Parser(opts);
              var ext = path.extname(masterConfig.less.build.src);
              Q.nfcall(fs.readFile, path.join(baseDir, url + ext), 'utf8')
              .then(function(input) {
                return Q.nfcall(parser.parse.bind(parser), input);
              })
              .then(function(tree) {
                res.end(tree.toCSS(opts));
              })
              .fail(function(error) {
                res.end(error);
              })
              .done();
            });
            return middlewares;
          }
        }
      },
      dist: {
        options: {
          base: 'dist',
          keepalive: true
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'clean',
    'copy',
    'less',
    'jshint',
    'dust',
    'requirejs',
    'htmlmin',
    'karma'
  ]);
};