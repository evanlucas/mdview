module.exports = function(grunt) {
  grunt.initConfig({
    recess: {
      options: {
        compile: true
      },
      github: {
        src: ['less/github.less'],
        dest: 'public/css/github.css'
      },
      npm: {
        src: ['less/npm.less'],
        dest: 'public/css/npm.css'
      },
      default: {
        src: ['less/hbc.less'],
        dest: 'public/css/style.css'
      }
    },
    
    watch: {
      recess: {
        files: 'less/*.less',
        tasks: ['recess']
      }
    },
    
    modverify: {
      all: {
        options: {}
      }
    },
    
    cafemocha: {
      test: {
        src: 'tests/test.js',
        options: {
          ui: 'bdd',
          reporter: grunt.option('reporter') || 'spec',
          colors: true
        }
      }
    }
  })
  
  grunt.loadNpmTasks('grunt-recess')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-modverify')
  grunt.loadNpmTasks('grunt-cafe-mocha')
  
  grunt.registerTask('test', ['modverify', 'cafemocha'])
  grunt.registerTask('styles', ['recess'])
  grunt.registerTask('default', ['test'])
}