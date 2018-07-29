'use strict';

const os = require('os');

const isWindows = os.type().toLowerCase().match(/windows/);

/**
 * Gruntfile for the web assets for the `formation` JS library. Automates and tests builds
 * for development and production. Use this when you modify source code files to build and
 * test the codebase.
 */
module.exports = function(grunt) {
  // Project configuration.
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const webpack = require('webpack');
  const defaultWebpackConfig = require('./webpack.config.js');
  const pkg = grunt.file.readJSON('package.json');
  grunt.initConfig({
    pkg,

    paths : {
      docs : 'docs',
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
      dev : {
        devtool: 'source-map',
        mode: 'development',
      },
      build : {
        mode: 'production',
        output: {
          filename: 'formation.min.js'
        },
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              parallel: true,
              sourceMap: true,
            })
          ]
        },
        plugins : [
          new webpack.BannerPlugin({
            banner: `Package: ${pkg.name}\r\n${pkg.description}\r\nVersion: ${pkg.version}\r\nAuthor: ${pkg.author}\r\nBuilt: ${grunt.template.today('yyyy-mm-dd HH:MM')}`,
            entryOnly : true
          }),
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
          coverageFolder: '<%= paths.jsTestResultsSrc %>',
          nodeExec: isWindows ? require.resolve('./node_modules/.bin/babel-node.cmd') : require.resolve('./node_modules/.bin/babel-node'),
          scriptPath: require.resolve('isparta/lib/cli'),
          mochaOptions: ['--compilers', 'js:babel-register', '--require', 'jsdom-global/register'],
          reportFormats: ['lcov', 'html']
        }
      }
    },
    istanbul_check_coverage : { // jshint ignore:line
      default : {
        options: {
          coverageFolder: '<%= paths.jsTestResultsSrc %>'
        }
      }
    },

    /* Copy compiled JS files to docs examples JS folder so GitHub Pages site has newest version. */
    copy : {
      toDocs : {
        files : [
          {
            expand: true,
            cwd: './<%= paths.jsOut %>',
            src: '*.*',
            dest: './<%= paths.docs %>/examples/js'
          }
        ]
      }
    }
  });

  // Load up all appropriate Tasks
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-webpack');

  /* Register our tasks */

  // The development build will lint all JS, concatenate all dependency JS, and concatenate project source JS.
  grunt.registerTask('dev', ['jshint:all', 'webpack:dev']);

  // Just run unit tests without re-building the development source each time.
  grunt.registerTask('unitTests', ['mocha_istanbul']);
  grunt.registerTask('unitTests:mocha', ['mochaTest']);

  // The test build will build the development source and unit test that.
  grunt.registerTask('test', ['dev', 'unitTests']);

  // Our production build will first unit test all development code before producing production output.
  grunt.registerTask('build', ['test', 'webpack:build', 'copy:toDocs']);

};
