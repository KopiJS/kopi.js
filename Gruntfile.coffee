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

  grunt.loadNpmTasks 'grunt-mocha-test'

  grunt.registerTask 'test', 'mochaTest'