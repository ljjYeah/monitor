const { merge } = require('webpack-merge');
const path = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    compress: true,
    hot: true,
    port: 9000,
  },
});
