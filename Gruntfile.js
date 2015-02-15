module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     jshint: {
       files: ['app/**/*.js'],
       options: {
         // options here to override JSHint defaults
         jshintrc: true
       }
     }
  });

   //Load the plugin that provides the "jshint" task.
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.registerTask('default', ['jshint']);
};
