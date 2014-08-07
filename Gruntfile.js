var fs = require('fs')
  ;

// This function takes all the files from the preset shapes directory and requires them for this project. 
// TODO make it possible to define "palettes" of different preset shapes, such as "pathways," "electrical circuits," etc.
(function includePresetShapes() {
  var presetShapeFileNames = fs.readdirSync('./lib/preset-shapes')
    .filter(function(fileName) {
      // we only want the shapes, not the "class" definition file
      return fileName.substring(fileName.length - 3) === '.js' && fileName.indexOf('preset-shapes') === -1;
    })
    .map(function(fileName) {
      return fileName.replace('.js', '');
    });

  var automaticShapeGenerationWarningString = '  // These shapes are automatically added to this file based on the contents of this directory. See Gruntfile.js.\n';

  var presetShapeNameRequireString = 'var presetShapes = {\n';
  presetShapeNameRequireString += automaticShapeGenerationWarningString;
  presetShapeFileNames.forEach(function(presetShapeName) {
    presetShapeNameRequireString += '  ' + presetShapeName + ': require(\'./' + presetShapeName + '\'),\n';
  });

  var presetShapesFile = fs.readFileSync('./lib/preset-shapes/preset-shapes.js', {encoding: 'utf8'});

  // get rid of first line with module.exports
  presetShapesFile = presetShapesFile.replace(/^var\ presetShapes\ =\ {.*\n/, '');
  // get rid of warning so it isn't duplicated
  presetShapesFile = presetShapesFile.replace(automaticShapeGenerationWarningString, '');
  // get rid of old shape requires
  presetShapesFile = presetShapesFile.replace(/[^|\n].*((\w)*: ).*require\(.*\n/g, '');
  presetShapesFile =  presetShapeNameRequireString + presetShapesFile;
  fs.writeFileSync('./lib/preset-shapes/preset-shapes.js', presetShapesFile);
})();

var specFileName;

module.exports = function(grunt) {

// ----------
var packageJson = grunt.file.readJSON("package.json");

// ----------
// Project configuration.
grunt.initConfig({
    browserify: {
      //exclude: 'lodash',
      dev: {
        files: {
          'dist/lib/cross-platform-shapes/js/cross-platform-shapes.min.js': './index.js'
        },
        options: {
          bundleOptions: {debug: true}
        , transform: ['deglobalify', 'brfs']
        }
      },
      build: {
        files: {
          'dist/lib/cross-platform-shapes/js/cross-platform-shapes.js': './index.js'
        },
        // src: [srcDir + 'js/cross-platform-shapes.js'],
        // dest: distLibDir + 'cross-platform-shapes/js/cross-platform-shapes.js',
        options: {
          bundleOptions: {}
        , transform: ['deglobalify', 'brfs']
        }
      }
    },
    pkg: packageJson,
    clean: {
      build: ['./dist/'],
      index: ['./dist/index.html']
    },
    uglify: {
      options: {
        mangle: false
      },
      crossPlatformShapes: {
        src: [ 'dist/lib/cross-platform-shapes/js/cross-platform-shapes.js' ],
        dest: 'dist/lib/cross-platform-shapes/js/cross-platform-shapes.min.js'
      }
    },
    watch: {
      browserify: {
        files: ['./index.js','./lib/**/*.js'],
        tasks: ['browserify:dev'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: [ "Gruntfile.js", "./src/**/*.js" ],
        tasks: ['test-min', 'quick-build'],
        //tasks: ['net', 'build'],
        options: {
          interrupt: true,
        },
      },
      /*
      build: {
        files: [ "Gruntfile.js", "public/js/*.js" ],
        tasks: ['build']
      }
      //*/
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      beforebuild: ['./index.js','./lib/**/*.js'],
    },
    /*
    str2js: {
      'crossPlatformShapesNS': { 'markers.js': ['markers.svg']}
    },
    //*/
    "git-describe": {
      build: {
        options: {
          prop: "gitInfo"
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch:browserify']
      }
      //protractor_test: ['protractor-chrome', 'protractor-firefox'],
      //protractor_test: ['protractor-chrome', 'protractor-safari', 'protractor-firefox']
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ignore: ['node_modules/**'],
          watch: ['server']
        }
      }
    },
    protractor: {
      options: {
        keepAlive: true,
        singleRun: false,
        configFile: "test/protractor-config.js"
      },
      chrome: {
        options: {
          args: {
            browser: "chrome"
          }
        }
      },
      safari: {
        options: {
          args: {
            browser: "safari"
          }
        }
      },
      firefox: {
        options: {
          args: {
            browser: "firefox"
          }
        }
      }
    },
    net: {
      remote: {
        host: '192.168.42.74',
        port:5004,
        tasks: ['protractor-e2e']
      }
    },
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:ariutta/cross-platform-shapes.git',
          branch: 'gh-pages'
        }
      },
      local: {
        options: {
          remote: '../',
          branch: 'build'
        }
      },
    }
  });

  // These plugins provide necessary tasks.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('protractor-chrome', 'Run local tests for development', function() {
    grunt.config.set('protractor.chrome.options.args.specs', ['test/e2e/' + grunt.option('spec') + '.js']);
    grunt.task.run('protractor:chrome');
  });
  grunt.registerTask('protractor-safari', 'Run local tests for development', function() {
    grunt.config.set('protractor.safari.options.args.specs', ['test/e2e/' + grunt.option('spec') + '.js']);
    grunt.task.run('protractor:safari');
  });
  grunt.registerTask('protractor-firefox', 'Run local tests for development', function() {
    grunt.config.set('protractor.firefox.options.args.specs', ['test/e2e/' + grunt.option('spec') + '.js']);
    grunt.task.run('protractor:firefox');
  });
  grunt.registerTask('protractor-e2e', ['concurrent:protractor_test']);

  grunt.registerTask('set_global', 'Set a global var.', function(name, val) {
    global[name] = val;
  });

  grunt.registerTask('set_array_config', 'Set a config property that is an array.', function(name, val) {
    var valArray = val.split(',');
    grunt.config.set(name, valArray);
  });

  grunt.registerTask('set_config', 'Set a config property.', function(name, val) {
    grunt.config.set(name, val);
  });


  // Live development
  grunt.registerTask('dev', 'Live Browserify', ['browserify:dev', 'concurrent:dev']);

  // build 
  grunt.registerTask('build', ['sync', 'clean:build', 'git-describe', 'jshint:beforebuild', 'browserify:build', 'uglify']);

  // test
  grunt.registerTask('test-min', 'Run local tests for development', function(val) {
    grunt.option('spec', 'minimal');
    grunt.task.run('protractor-safari');
  });

  // Build, create and publish gh-pages
  grunt.registerTask('build-pages', ['build', 'buildcontrol:pages']);
  //grunt.registerTask('build-pages', ['build', 'replace:pages', 'buildcontrol:pages', 'clean:index']);

  grunt.registerTask('test', 'Run extensive local tests', function(val) {
    grunt.option('spec', val);
    grunt.task.run('protractor-e2e');
  });

  // Default task(s).
  grunt.registerTask('default', ['dev']);
};
