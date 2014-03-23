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
        interupt: true,
        livereload: true
      },
      build: {
        files: 'src/**',
        tasks: [
          'default'
        ]
      }
    },
    connect: {
      build: {
        options: {
          base: 'dist',
          livereload: true,
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