module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      "flappy": {
        src: [
          "src/draw.js",
          "src/animation.js",
          "src/layer.js",
          "src/defaults.js",
          "src/scene.js",
          "src/flappy.js"
        ],
        dest: "dist/game.js"
      }
    },

    uglify: {
      js: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/game.min.js': ['dist/game.js']
        },
      },
    },

    watch: {
      files: ['src/**/*.js'],
      tasks: ['build:dev'],
      options: {
        spawn: false,
      }
    },

    run: {
      test: {
        cmd: 'npm',
        args: [
          'run',
          'test'
        ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask("test", ["run:test"]);
  grunt.registerTask("watch:dev", ["watch"]);
  grunt.registerTask("build", ["concat", "uglify:js"]);
  grunt.registerTask("build:dev", ["concat"]);
  grunt.registerTask("default", ["concat"]);

}
