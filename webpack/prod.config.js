import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBase from './base.config';
import config from '../config';

module.exports = webpackMerge(webpackBase, {
  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'production\'',
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        warnings: false,
      },
      mangle: {
        reserved: ['$super', '$', 'exports', 'require'],
      },
      output: {
        comments: false,
      },
    }),
    new webpack.BannerPlugin({
      banner: config.banner,
      raw: true,
    }),
  ],
});
