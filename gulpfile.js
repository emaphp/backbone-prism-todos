var gulp = require('gulp'),
	gulpUtil = require('gulp-util'),
	prettyHrtime = require('pretty-hrtime'),
	browserify = require('browserify'),
	browserifyGlobalShim = require('browserify-global-shim'),
	uglifyify = require('uglifyify'),
	source = require('vinyl-source-stream'),
	path = require('path'),
    notify = require('gulp-notify'),
    exorcist = require('exorcist'),
    gulpif = require('gulp-if'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    del = require('del');

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
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: "Compilation error",
        message: "<%= error.message %>"
    }).apply(this, args);

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
var bundlerGenerator = function (watch, callback) {
	var bundleQueue = config.apps.length;

	return function (app) {
		var input = './' + app;
		var output = './public/app.js';
		var options = {
			fullPaths: false,
			entries: input,
			transform: watch ? [babelify, globalShim] : [babelify, globalShim, uglifyify],
			extensions: ['.jsx'],
			debug: watch
		};

        if (watch) {
            options.cache = {};
            options.packageCache = {};
        }

        var bundler = browserify(options);

        var bundle = function() {
            bundleLogger.start(output);

            return bundler
                .bundle()
                .on('error', errorHandler)
                .pipe(gulpif(watch, exorcist(output + '.map', null, config.sourceRoot, config.path)))
                .pipe(source(path.basename(output)))
                .pipe(gulp.dest(path.dirname(output)))
                .on('end', reportFinished);
        };

        if (watch) {
            bundler = watchify(bundler);
            bundler.on('update', bundle);
        }

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

gulp.task('clean', function() {
	del('./app.js.map');
});

gulp.task('default', ['clean'], function (callback) {
    var browserifyThis = bundlerGenerator(true, callback);
    config.apps.forEach(browserifyThis);
});

gulp.task('build', function(callback) {
    var browserifyThis = bundlerGenerator(false, callback);
    config.apps.forEach(browserifyThis);
});
