import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import webpackCommon from './common.config';

export default webpackMerge(webpackCommon, {
  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'"
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});
