import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackBase from './base.config';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

module.exports = webpackMerge(webpackBase, {
  devtool: 'inline-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'development\'',
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerPort: 4000,
      openAnalyzer: false,
    }),
  ],
});
