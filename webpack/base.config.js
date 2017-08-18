import webpack from 'webpack';
import path from 'path';
import config from '../config';

// import PrettierPlugin from 'prettier-webpack-plugin';

export default {
  watch: false, // dynamically changed by gulp
  context: path.join(config.root, config.scripts.source),
  entry: {
    vendors: ['jquery'],
    scripts: './scripts.js',
  },
  output: {
    path: path.join(config.root, config.scripts.build),
    filename: '[name].js',
    publicPath: 'js/',
  },
  // externals: [
  //   'jquery'
  // ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: '[name].js',
      minChunks: Infinity,
    }),
    // uncomment in case of emergency code formatter need
    // new PrettierPlugin({
    //     printWidth: 80,
    //     tabWidth: 2
    // }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      jquery: path.resolve('node_modules', 'jquery/dist/jquery.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [path.resolve(config.root, 'node_modules')],
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery',
          },
          {
            loader: 'expose-loader',
            options: '$',
          },
        ],
      },
    ],
  },
};
