module.exports = function(grunt) {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');

    // Setup config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
					          new webpack.DefinePlugin({
						            "process.env": {
							              // This has effect on the react lib size
							              "NODE_ENV": JSON.stringify("production")
						            }
					          }),
                    new webpack.optimize.OccurenceOrderPlugin(),
					          new webpack.optimize.DedupePlugin(),
					          new webpack.optimize.UglifyJsPlugin()
				        )
            },
            "build-dev": {
				        devtool: "sourcemap",
				        debug: true
			      }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');

    // Tasks
    grunt.registerTask('default', ['webpack:build']);
}
