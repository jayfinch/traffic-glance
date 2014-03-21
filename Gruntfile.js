module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: [
        'dist'
      ]
    },
    bower: {
      install: {
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
        helper: 'dust',
        dependencies: {
          dust: 'dust'
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
        'src/**/*.js'
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
      server: {
        options: {
          base: 'dist',
          livereload: false,
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
    'htmlmin'
  ]);
};