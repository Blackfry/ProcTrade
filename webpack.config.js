// http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup


var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'app.js');

var config = {

	context: __dirname,
	// Make sure errors in console map to the correct file
	// and line number (sourcemapping)
	devtool: 'eval-source-map',

	entry: [

		// For hot style updates
		'webpack/hot/dev-server',

		// The script refreshing the browser on non hot updates
		'webpack-dev-server/client?http://localhost:3001',

		// Our application
		mainPath
	],

	output: {

		// We need to give webpack a path. It does not actually need it,
		// because files are kept in memory in webpack-dev-server, but an
		// error will occur if nothing is specified. We use the buildPath
		// to point where the files will eventually be bundled in production.
		path: buildPath,
		filename: 'bundle.js',

		//  Everything related to Webpack should go through a build path,
		// localhost:3000/build. That makes proxying easier to handle
		publicPath: '/build/'
	},

	module: {

		loaders: [

		// I highly recommend using the babel-loader as it gives you
		// ES6/7 syntax and JSX transpiling out of the box
		{
			test: /\.js$/,
			loader: 'babel',
			exclude: [nodeModulesPath]
		},

		{
			test: /\.css$/,
			loader: 'style!css'
		}

		]
	},

	// We have to manually add the Hot Replacement plugin when running
	// from Node
	plugins: [new Webpack.HotModuleReplacementPlugin()]

};

module.exports = config;