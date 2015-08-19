// Karma configuration
// Generated on Wed Jul 29 2015 21:03:00 GMT+0100 (BST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: [
     'karma-jasmine',
     'karma-babel-preprocessor',
     'karma-phantomjs-launcher',
     'karma-coverage',
     'isparta',
     'karma-sourcemap-loader'
    ],
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'jasmine' ],


    // list of files / patterns to load in the browser
    files: [
        './app/node_modules/angular/angular.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './app/node_modules/angular-resource/angular-resource.js',
        './app/node_modules/angular-new-router/dist/router.es5.js',
        './app/node_modules/angular-animate/angular-animate.js',
        './app/node_modules/angular-aria/angular-aria.js',
        './app/node_modules/angular-material/angular-material.js',
        './app/node_modules/angular-translate/dist/angular-translate.js',
        './app/app.js',
        './app/services/lb-services.js',
        './app/components/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/components/**/*.test.unit.js': [ 'babel' ],
      'app/components/**/!(*.test.unit).js': [ 'babel', 'sourcemap', 'coverage' ],
      './app/app.js': [ 'babel', 'sourcemap', 'coverage' ]
    },
    
    babelPreprocessor: {
        options: {
            sourceMap: 'inline',
            blacklist: ['useStrict']
        },
        sourceFileName: function(file) {
            return file.originalPath;
        }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'progress', 'coverage' ],
    
    coverageReporter: {
      instrumenters: {isparta: require('isparta')},
      instrumenter: {
          './app/app.js': 'isparta',
          './app/components/**/!(*.test.unit).js': 'isparta'
      },
      reporters: [{
        type : 'text'
      }, {
        type: 'html'
      }],
      dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'PhantomJS' ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
