/* eslint-disable comma-dangle */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jsonlint: {
      all: ['*.json'],
    },

    eslint: {
      all: {
        src: ['*.js', 'test/*.js'],
        ignore: '*.min.js',
      },
    },

    mochacov: {
      test: {
        options: {
          reporter: 'spec'
        }
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          output: 'coverage/coverage.html'
        }
      },
      testAndCoverage: {
        options: {
          coveralls: true
        }
      },
      options: {
        files: 'test/*.js'
      }
    },
  });

  // Load the Grunt plugins
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-cov');

  // Register tasks
  grunt.registerTask('lint', ['jsonlint', 'eslint']);
  grunt.registerTask('test', ['mochacov:test'].concat(process.env.CI ? ['mochacov:testAndCoverage'] : []));
  grunt.registerTask('coverage', ['mochacov:coverage']);
  grunt.registerTask('default', ['lint', 'test']);
};
