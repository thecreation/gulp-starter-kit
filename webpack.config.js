import config from './config';
import devWebpackConfig from './webpack/dev.config';
import prodWebpackConfig from './webpack/prod.config';

let webpackConfig = {};

if(config.production) {
  webpackConfig = prodWebpackConfig
} else {
  webpackConfig = devWebpackConfig;
}

export default webpackConfig;
