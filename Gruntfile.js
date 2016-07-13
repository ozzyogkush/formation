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
      jsSrc : 'src',
      jsTestSrc : 'tests',
      jsTestResultsSrc : 'test-results',
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
    },

    mochaTest: {
      test: {
        src: ['<%= paths.jsTestSrc %>/**/*.js'],
        options : {
          timeout : 7000,
          reporter : 'spec',
          require: ['babel-register', 'jsdom-global/register']
        }
      }
    },

    mocha_istanbul: { // jshint ignore:line
      coverage : {
        src:['<%= paths.jsTestSrc %>/**/*.js'],
        options: {
          coverageFolder: 'test-results',
          nodeExec: require.resolve('./node_modules/.bin/babel-node.cmd'),
          scriptPath: require.resolve('isparta/bin/isparta'),
          mochaOptions: ['--compilers', 'js:babel-register', '--require', 'jsdom-global/register'],
          reportFormats: ['html']
        }
      }
    },
    istanbul_check_coverage : { // jshint ignore:line
      default : {
        options: {
          coverageFolder: 'test-results'
        }
      }
    }
  });

  // Load up all appropriate Tasks
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-webpack');

  /* Register our tasks */

  // The development build will lint all JS, concatenate all dependency JS, and concatenate project source JS.
  grunt.registerTask('dev', ['jshint:all', 'webpack:dev']);

  // Just run unit tests without re-building the development source each time.
  grunt.registerTask('unitTests', ['mochaTest', 'mocha_istanbul']);

  // The test build will build the development source and unit test that.
  grunt.registerTask('test', ['dev', 'unitTests']);

  // Our production build will first unit test all development code before producing production output.
  grunt.registerTask('build', ['test', 'webpack:build']);

};
