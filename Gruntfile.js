'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watch for changes and trigger compass, jshint, uglify and livereload
    watch: {
      compass: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['compass:dev']
      },
      js: {
        files: '<%= jshint.all %>',
        tasks: ['jshint', 'uglify:dev']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'css/style.css',
          'js/*.js',
          'images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Compass and scss
    compass: {
      options: {
        bundleExec: true,
        httpPath: '/sites/all/themes/my-theme',
        cssDir: 'css',
        sassDir: 'sass',
        imagesDir: 'images',
        javascriptsDir: 'js',
        fontsDir: 'css/fonts',
        assetCacheBuster: 'none',
        require: [
          'sass-globbing'
        ]
      },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'expanded',
          relativeAssets: true,
          raw: 'line_numbers = :true\n'
        }
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compact',
          force: true
        }
      }
    },

    // Javascript linting with jshint
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'js/src/*.js',
        '!js/src/*.min.js'
      ]
    },

    // Concat & minify
    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          preserveComments: 'all',
          beautify: true
        },
        files: {
          'js/vendor.js': [
            'components/eventEmitter/EventEmitter.js',
            'components/eventie/eventie.js',
            'components/imagesloaded/imagesloaded.js',
            'components/formalize/assets/js/jquery.formalize.js'
          ],
          'js/script.js': [
            'js/src/*.js',
            '!js/src/*.min.js'
          ]
        }
      },
      dist: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'js/vendor.js': [
            'components/eventEmitter/EventEmitter.js',
            'components/eventie/eventie.js',
            'components/imagesloaded/imagesloaded.js',
            'components/formalize/assets/js/jquery.formalize.js'
          ],
          'js/script.js': [
            'js/src/*.js',
            '!js/src/*.min.js'
          ]
        }
      }
    },

    // Copy files
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'components/formalize/assets/css/',
            src: '_formalize.scss',
            dest: 'sass/partials/vendor/',
            filter: 'isFile',
            flatten: true
          },
          {
            expand: true,
            cwd: 'components/formalize/assets/images/',
            src: '**',
            dest: 'images/',
            filter: 'isFile',
            flatten: true
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', [
    'copy',
    'jshint',
    'uglify:dist',
    'compass:dist'
  ]);

  grunt.registerTask('default', [
    'copy',
    'jshint',
    'uglify:dev',
    'compass:dev',
    'watch'
  ]);

};
