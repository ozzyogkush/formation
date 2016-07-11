'use strict';

const defaultWebpackConfig = require('./webpack.config.js');
const webpack = require('webpack');

/**
 * Gruntfile for the web assets for the `formation` JS library. Automates and tests builds
 * for development and production. Use this when you modify source code files to build and
 * test the codebase.
 */
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    paths : {
      grunt : 'grunt',
      jsSrc : 'src',
      jsTestSrc : 'tests',
      jsOut : 'dist'
    },

    /* Set up our linter for JS files */
    jshint : {
      options : {
        jshintrc : '.jshintrc'
      },
      all : {
        src : [
          'Gruntfile.js',
          'webpack.config.js',
          '<%= paths.jsSrc %>/**/*.js',
          '<%= paths.jsTestSrc %>/**/*.js'
        ]
      }
    },

    webpack : {
      options : defaultWebpackConfig,
      dev : {},
      build : {
        output: {
          filename: 'formation.min.js'
        },
        plugins : [
          new webpack.BannerPlugin(
            '<%= pkg.name %> Version <%= pkg.version %> built on <%= grunt.template.today("yyyy-mm-dd") %>',
            {
              entryOnly : true
            }
          ),
          new webpack.optimize.UglifyJsPlugin({
            mangle: {
              except: ['jQuery', '$', 'exports', 'require', 'Formation']
            }
          })
        ]
      }
    }
  });

  // Load up all appropriate Tasks
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-webpack');

  /* Register our tasks */

  // The development build will lint all JS and then use webpack to build a non-uglified set of output files.
  grunt.registerTask('dev', ['jshint:all', 'webpack:dev']);

  // The test build will build the development source.
  grunt.registerTask('test', ['dev']);

  // Our production build will first unit test all development code before producing production output.
  grunt.registerTask('build', ['test', 'webpack:build']);

};
