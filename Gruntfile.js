module.exports = function (grunt) {

  // Configuration du build
  grunt.initConfig({

    // Parametrage

    package: grunt.file.readJSON('package.json'),

    src: {
      html: {
        root: '',
        all:  '**/*.html'
      },
      assets: 'assets',
      scss: {
        all:  'scss/**/*.scss'
      },
      css: {
        all:  'css/**/*.css'
      },
      js: {
        app:  'javascript/**/*.js'
      }
    },
    

    // Configuration des taches

    sass: {
      dev: {
        files: {
          '<%= src.css.app %>': '<%= src.scss.app %>'
        }
      }
    },

    compass:{
        
        dev: {
            options:{
                sassDir: 'scss',
                sourcemap: true,
                cssDir : 'css'
            }
        }
        
    },

    'http-server': {
      'dev': {

            // the server root directory
            root: "./",

            port: 8080,

            host: "127.0.0.1",

            cache: 0,
            showDir : true,
            autoIndex: true,
            defaultExt: "html",

            // run in parallel with other tasks
            runInBackground: true

        }
    },

   

   

    // Configuration du watch : compilation sass + livereload sur modif sass et html

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['<%= src.scss.all %>'],
        tasks: ['compass']
      },
      html: {
        files: ['<%= src.html.all %>']
      },
      javascript: {
        files: ['<%= src.js.app %>']
      }
    }

  });

  // Chargement des plugins
  require('load-grunt-tasks')(grunt);
  
  // Declaration des taches
  grunt.registerTask('serve',        ['compass', 'http-server:dev', 'watch']);
  
};
