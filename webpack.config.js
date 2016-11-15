'use strict'

var webpack = require('webpack'),
    jsPath  = 'app/assets/javascripts',
    path = require('path'),
    srcPath = path.join(__dirname, 'app/assets/javascripts'),
    promise = require('es6-promise').polyfill();

var config = {
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    noInfo: false,
    target: 'web',
    entry: {
        app: path.join(srcPath, 'app.jsx')
        //, common: ['react-dom', 'react']
    },
    resolve: {
        alias: {},
        root: srcPath,
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', jsPath]
    },
    output: {
        path:path.resolve(__dirname, 'app/assets/javascripts'),
        publicPath: '',
        filename: '[name].js',
        pathInfo: true
    },
    eslint: {
        configFile: path.join(__dirname, '.eslintrc')
    },

    module: {
        noParse: [],
        preLoaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader'}
        ],
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.css$/, loader: 'style!css' },
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },
    plugins: [
        function () {
            this.plugin("done", function (stats) {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log(stats.compilation.errors);
                    process.exit(1); // or throw new Error('webpack build failed.');
                }
            });
        }
        //new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false },
        //     output: { comments: false }
        // })
    ]
};

module.exports = config;