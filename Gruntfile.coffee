module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    mochaTest:
      kopi:
        options:
          reporter: 'dot'
          require: [
            './test/spec_helper.coffee'
          ]
          timeout: 1000
          ui: 'bdd'
          growl: true
        src: 'test/*_spec.*'
    coffee:
      dist:
        src: 'lib/*.coffee'
        dest: 'dist/kopi.js'
    uglify:
      min:
        files:
          'dist/kopi.min.js': 'dist/kopi.js'

  grunt.loadNpmTasks 'grunt-mocha-test'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'test', 'mochaTest'
  grunt.registerTask 'dist', [
    'coffee'
    'uglify'
  ]
