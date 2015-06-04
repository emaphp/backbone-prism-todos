var gulp = require('gulp'),
	gulpUtil = require('gulp-util'),
	prettyHrtime = require('pretty-hrtime'),
	browserify = require('browserify'),
	browserifyGlobalShim = require('browserify-global-shim'),
	reactify = require('reactify'),
	uglifyify = require('uglifyify'),
	source = require('vinyl-source-stream'),
	path = require('path');

// Logger
var bundleLogger = (function() {
	var startTime;

	return {
		start: function(filepath) {
			startTime = process.hrtime();
			gulpUtil.log('Compiling', gulpUtil.colors.green(filepath) + '...');
		},

		end: function(filepath) {
			var taskTime = process.hrtime(startTime);
			var prettyTime = prettyHrtime(taskTime);
			gulpUtil.log('Compiled', gulpUtil.colors.green(filepath), 'in', gulpUtil.colors.magenta(prettyTime));
		}
	}
})();

// Error handler
var errorHandler = function () {
    this.emit('end');
};

// Shim
var globalShim = browserifyGlobalShim.configure({
    'jquery': '$',
    'backbone': 'Backbone',
    'underscore': '_',
    'react': 'React',
    'flux': 'Flux',
    'backbone.localstorage': 'Backbone.LocalStorage',
    'backbone.prism': 'Backbone.Prism',
    'backbone.radio': 'Backbone.Radio'
});

// Config
var config = {
	sourceRoot: '',
	path: '',
	apps: ['app/main.js']
};

// Bundler
var bundlerGenerator = function (callback) {
	var bundleQueue = config.apps.length;

	return function (app) {
		var input = './' + app;
		var output = './public/app.js';
		var options = {
			fullPaths: false,
			entries: input,
			transform: [reactify, globalShim, uglifyify],
			extensions: ['.jsx'],
			debug: false
		};

        var bundler = browserify(options);

        var bundle = function() {
            bundleLogger.start(output);

            return bundler
                .bundle()
                .on('error', errorHandler)
                .pipe(source(path.basename(output)))
                .pipe(gulp.dest(path.dirname(output)))
                .on('end', reportFinished);
        };

        var reportFinished = function() {
            bundleLogger.end(output);

            if (bundleQueue) {
                bundleQueue--;

                if (bundleQueue === 0) {
                    callback();
                }
            }
        };

        return bundle();
	};
};

gulp.task('build', function(callback) {
    var browserifyThis = bundlerGenerator(callback);
    config.apps.forEach(browserifyThis);
});
