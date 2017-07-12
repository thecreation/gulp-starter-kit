import pkg from './package';
import util from 'gulp-util';

const production = util.env.production || util.env.prod || false;

export default {
  metadata: {
    production,
    pkg
  },
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,

  root: __dirname,
  paths: {
    source: './src/html',
    build: 'dest'
  },
  assets: {
    source: 'src',
    build: 'dest/assets'
  },
  enable: {
    webpack: true
  },
  server: {
    port: 4000,
    notify: true,
    open: true
  },
  env: 'development',
  production: production,
  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },
  styles: {
    include: [
      // 'node_modules',
      // 'bower_components'
    ]
  },
  scripts: {
    webpack: {
      watch: false
      // entry: {},
      // output: {},
      // plugins: []
    }
  },
  html: {
    minify: {
      // For more options, see https://github.com/kangax/html-minifier
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      keepClosingSlash: true,
      minifyCSS: true,
      minifyJS: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true
    }
  }
};
