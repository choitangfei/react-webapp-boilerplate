const webpack = require('webpack');
const webpackConfig = require('./webpack.prod');
webpack(webpackConfig, function(errors, state){});
