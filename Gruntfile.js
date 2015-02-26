var babelify = require('babelify');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      kopi: {
        options: {
          reporter: 'dot',
          require: ['babel/register', './test/spec_helper.js'],
          timeout: 1000,
          ui: 'bdd',
          growl: true
        },
        src: 'test/*_spec.*'
      }
    },
    browserify: {
      browser: {
        files: {
          'dist/kopi.js': ['lib/kopi.js']
        },
        options: {
          transform: [babelify],
          browserifyOptions: {
            standalone: 'Kopi' // Expose 'Kopi' global variable
          }
        }
      }
    },
    uglify: {
      min: {
        files: {
          'dist/kopi.min.js': 'dist/kopi.js'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('dist', ['browserify', 'uglify']);
};
