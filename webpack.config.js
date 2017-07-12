import webpack from 'webpack';
import path from 'path';
import util from 'gulp-util';
import config from './config';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// uncomment in case of emergency code formatter need
// import PrettierPlugin from 'prettier-webpack-plugin';

function createConfig(env) {
  let isProduction;
  let webpackConfig;

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  isProduction = env === 'production';

  webpackConfig = {
    context: path.join(__dirname, config.assets.source, 'scripts'),
    entry: {
      // vendor: ['jquery'],
      scripts: './scripts.js'
    },
    output: {
      path: path.join(__dirname, config.assets.build, 'scripts'),
      filename: '[name].js',
      publicPath: 'js/'
    },
    devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'vendor',
      //     filename: '[name].js',
      //     minChunks: Infinity
      // }),
      // uncomment in case of emergency code formatter need
      // new PrettierPlugin({
      //     printWidth: 80,
      //     tabWidth: 4
      // }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
      extensions: ['.js']
      // alias: {
      //     "jquery": path.resolve('node_modules', 'jquery/dist/jquery.js')
      // }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [path.resolve(__dirname, 'node_modules')]
        }
      ]
    }
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );
  } else {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false
      })
    );
  }

  return webpackConfig;
}

export default createConfig();
export { createConfig };
