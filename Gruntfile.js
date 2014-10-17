/**
 * Source from "Automate with Grunt"
 *  This is a learning hand-on experience on grunt
 */
module.exports = function(grunt) {
  /**
   * recursiveCopy:
   *  used to copy directory files recursive
   * @param source - directory or file
   * @param destination - path to copy to
   */
  function recursiveCopy(source, destination) {
    if (grunt.file.isDir(source)) {
      grunt.file.recurse(source, function(file) {
        recursiveCopy(file, destination);
      });
    } else {
      grunt.log.writeln('Copying ' + source + ' to ' + destination);
      grunt.file.copy(source, destination + '/' + source);
    }
  }

  // Specifying Configuration Options
  grunt.config.init({
    copyFiles: {
      options: {
        workingDirectory: 'working',
        // used for copying
        manifest: [
          'index.html',
          'stylesheets/style.css',
          'javascripts/app.js'
        ],
        // Recursive File Copying
        manifest2: [
          'index.html',
          'stylesheets/',
          'javascripts/'
        ]
      }
    },
    // Used Values from Files
    // grunt.config.get('pkg.name')
    pkg: grunt.file.readJSON('package.json'),
    // used by grunt task usingValuesFromFile
    usingValuesFromFile: {
      options: {
        workingDirectory: 'working'
      }
    },
    copyFilesUsingConfig: {
      options: {
        workingDirectory: 'working',
        // used for copying
        manifest: [
          'index.html',
          'stylesheets/style.css',
          'javascripts/app.js'
        ]
      }
    },
    // used by Multitasks
    weather: {
      home: 55429, // Brooklyn Center, MN
      work: 94080  // San Francisco, CA
    },
    // used Multitasks and Files & Fetching Client-Side Libraries with Bower
    build: {
      angular: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-resource/angular-resource.js'
        ],
        dest: 'dist/angular.js'
      },
      angularWithjQuery: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-resource/angular-resource.js'
        ],
        dest: 'dist/jquery-angular.js'
      }
    }
  });

  /**
   * Default task
   *  - grunt
   */
  grunt.registerTask('default', function() {
    // * always use grunt.log.writeLn() instead of console.log
    grunt.log.writeln('Hello from Grunt.');
  });

  /**
   * Handling parameters
   *  - grunt greet:@param (can handle more then one parameter)
   */
  grunt.registerTask('greet', function(name) {
    grunt.log.writeln('Hi there, ' + name);
  });

  /**
   * Throwing Errors
   *  - grunt addNumbers:a:b
   */
  grunt.registerTask('addNumbers', function(first, second) {
    if (isNaN(Number(first))) {
      // will stop the program but can use --force to skip
      grunt.warn('The first argument must be a number.');
    }
    if (isNaN(Number(second))) {
      // will stop the program
      grunt.fatal('The second argument must be a number.');
    }
    grunt.log.writeln('concat: ' + first + second);
    grunt.log.writeln('add: ' + (parseInt(first, 10) + parseInt(second, 10)));
  });

  /**
   * Chaining Tasks
   *  - grunt all
   */
  grunt.registerTask('all', ['default', 'greet:Doua', 'addNumbers:2:3']);

  /**
   * Describing Tasks
   *  - grunt --help
   *  - grunt praise
   */
  grunt.registerTask('praise', 'Have Grunt say nice things about you.', function() {
    var praise = [
      'You\'re awesome.',
      'You\'re the best developer ever!',
      'You are extremely attractive.',
      'Everyone loves you!'
    ];
    var pick = praise[(Math.floor(Math.random() * praise.length))];

    grunt.log.writeln(pick);
  });

  /**
   * Creating and Deleting Directories
   *  - grunt createFolder
   *  - grunt clean
   *  - grunt copyFiles
   */
  grunt.registerTask('createFolder', 'Create the working folder', function() {
    // summary:
    //	will create a directory in root

    // require config options workingDirectory to create folder
    grunt.config.requires('copyFiles.options.workingDirectory');
    // grunt.config.get(): get config properties
    grunt.file.mkdir(grunt.config.get('copyFiles.options.workingDirectory'));
  });

  grunt.registerTask('clean', 'Deletes the working folder and its contents', function() {
    // summary:
    //	will remove folder

    grunt.config.requires('copyFiles.options.workingDirectory');
    grunt.file.delete(grunt.config.get('copyFiles.options.workingDirectory'));
  });

  grunt.registerTask('copyFiles', function() {
    // summary:
    //	copy manifest file to working directory

    var files,
        workingDirectory;

    grunt.config.requires('copyFiles.options.manifest');
    grunt.config.requires('copyFiles.options.workingDirectory');

    files = grunt.config.get('copyFiles.options.manifest');
    workingDirectory = grunt.config.get('copyFiles.options.workingDirectory');

    files.forEach(function(file) {
      var destination = workingDirectory + '/' + file;

      grunt.log.writeln('Copying ' + file + ' to ' + destination);
      grunt.file.copy(file, destination);
    });
  });

  grunt.registerTask('recursiveCopy', function() {
    // summary:
    //	copy manifest2 files recursive

    var files,
        workingDirectory;

    grunt.config.requires('copyFiles.options.manifest2');
    grunt.config.requires('copyFiles.options.workingDirectory');

    files = grunt.config.get('copyFiles.options.manifest2');
    workingDirectory = grunt.config.get('copyFiles.options.workingDirectory');

    files.forEach(function(item) {
      recursiveCopy(item, workingDirectory);
    });

  });

  /**
   * Using Values from Files
   *  - grunt usingValuesFromFile
   */
  grunt.registerTask('usingValuesFromFile', function() {
    // summary:
    //	create a file call version.txt inside the workingDirectory
    //	that contains content from package.json (Grunt version 1.0.0)
    var content = '<%=pkg.name %> version <%= pkg.version %>',
        workingDirectory;

    // this.name: is the name of the registerTask (usingValuesFromFile)
    this.requiresConfig(this.name + '.options.workingDirectory');
    // this.options(): is the options in the config for (usingValuesFromFile)
    workingDirectory = this.options().workingDirectory;

    // grunt template engine
    content = grunt.template.process(content);
    grunt.file.write(workingDirectory + '/version.txt', content);
  });

  /**
   * Accessing Configuration inside Tasks
   */
  grunt.registerTask('copyFilesUsingConfig', function() {
    // summary:
    //	copy file to working directory using config options
    var files,
        workingDirectory;

    this.requiresConfig(this.name + '.options.manifest');
    this.requiresConfig(this.name + '.options.workingDirectory');

    files = this.options().manifest;
    workingDirectory = this.options().workingDirectory;

    files.forEach(function(item) {
      recursiveCopy(item, workingDirectory);
    });
  });

  /**
   * Grunt multitasks
   *  notices grunt.registerMultiTask instead of grunt.registerTask
   *  - grunt weather
   *  - grunt --help will add * next to the description if it is a multitasks
   */
  grunt.registerMultiTask('weather', 'Fetches weather', function() {
    var done,
        http,
        location,
        request,
        requestOptions,
        zipCode;

    // this.target: is the name of the multitask in the config (home or work)
    location = this.target;
    // this.data: is the data of the multitask in the config (55429, 94080)
    zipCode = this.data;

    requestOptions = {
      host: 'api.openweathermap.org',
      path: '/data/2.5/weather?units=imperial&q=' + zipCode,
      port: 80,
      method: 'GET'
    };

    http = require('http');

    // * important because http is async
    done = this.async();

    request = http.request(requestOptions, function(response) {
      var buffer = [];

      response.on('data', function(data) {
        buffer.push(data);
      });

      response.on('end', function() {
        var weather = JSON.parse(buffer.join());

        grunt.log.writeln(location + ' : ' + weather.main.temp + ' degrees');

        done();

      });
    });

    request.end();
  });

  /**
   * Multitasks and Files
   * Fetching Client-Side Libraries with Bower
   * similar to grunt-concat
   * - grunt build
   */
  grunt.registerMultiTask('build', 'Concatenate files.', function() {
    // summary:
    //	concat angular + angular-resource
    //	concat jquery + angular
    var output = '',
        sources;

    this.files.forEach(function(filegroup) {
      sources = filegroup.src.map(function(file) {
        return(grunt.file.read(file));
      });

      output = sources.join(';');

      grunt.file.write(filegroup.dest, output);
    });
  });

  /**
   * Grunt workflow with coffee script
   *  - grunt cofee
   *  will create a tmp/compiled.js
   */
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.config('coffee', {
    app: {
      options: {
        bare: false
      },
      files: {
        'tmp/compiled.js': [
          'coffeescript/app.coffee',
          'coffeescript/factories/*.coffee',
          'coffeescript/controllers/*.coffee'
        ]
      }
    }
  });

  /**
   * Grunt Concatenating JavaScript
   *  - grunt coffee need to be run first
   *  will concat files to tmp/app.js
   */
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config('concat', {
    scripts: {
      src: [
        'bower_components/angular/angular.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/markdown/dist/markdown.js',
        'tmp/compiled.js'
      ],
      dest: 'tmp/app.js'
    }
  });

  /**
   * Minifying JavaScript
   *  - grunt uglify
   */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    scripts: {
      files: {
        'assets/app.js': 'tmp/app.js'
      }
    }
  });

  /**
   * Sass compile
   *  - grunt sass
   *  * You need to have Ruby and Sass installed and in your PATH for this task to work.
   */
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.config('sass', {
    app: {
      files: {
        'tmp/app.css': ['sass/style.scss']
      }
    }
  });

  /**
   * Minifying CSS
   *  - grunt sass cssmin
   */
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin', {
    app: {
      files: {
        'assets/app.css': ['tmp/app.css']
      }
    }
  });

  /**
   * Simplifying the Build
   *  - grunt build2
   *  will run coffee, concat:scripts, sass, cssmin, uglify
   */
  grunt.registerTask('build2', 'Builds the application.', ['coffee', 'concat:scripts', 'sass', 'cssmin', 'uglify' ]);

  /**
   * Watching Files for Changes
   *  - grunt watch
   *  watch for file change and run tasks
   *  * To stop watching, press Ctrl-C
   */
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    scripts: {
      files: ['coffeescripts/**/*.coffee'],
      tasks: ['coffee', 'concat:scripts', 'uglify'],

      options: {
        spawn: false
      }
    },
    styles: {
      files: ['sass/**/*.scss'],
      tasks: ['sass', 'cssmin'],
      options: {
        spawn: false
      }
    },
    // Refreshing the Browser Automatically
    // LiveReload need to be add to browser
    interface: {
      files: ['index.html']
    },
    options: {
      livereload: true
    }
  });

  /**
   * Custom grunt plugin
   *  use to open file in chrome browser
   *  - grunt open:Gruntfile.js
   *  will open Gruntfile.js in the browser
   */
  grunt.loadTasks('tasks');

  /**
   * Using JSHint to Check for Errors and Problems
   *  - grunt jshint
   **/
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.config('jshint', {
    all: [
      'Gruntfile.js',
      'tasks/**/*.js'
    ],
    options: {
      jshintrc: '.jshintrc'
    }
  });
};

