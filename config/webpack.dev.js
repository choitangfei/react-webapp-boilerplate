const { merge } = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common');

module.exports = merge(commonWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].js',
  },
});
