import pkg from './package';
import util from 'gulp-util';

const production = util.env.production || util.env.prod || false;

export default {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,

  root: __dirname,
  paths: {
    source: 'src',
    build: 'dest'
  },

  assets: {
    source: 'src',
    build: 'dest/assets'
  },

  enable: {
    webpack: false,
    notify: true
  },

  server: {
    port: 4000,
    notify: true,
    open: true
  },

  styles: {
    source: 'src/styles',
    build: 'dest/assets/styles',
    include: [
      // 'node_modules',
      // 'bower_components'
    ]
  },

  scripts: {
    source: 'src/scripts',
    build: 'dest/assets/scripts'
  },

  fonts: {
    source: 'src/fonts',
    build: 'dest/assets/fonts'
  },

  svgs: {
    source: 'src/svgs',
    build: 'dest/assets/svgs'
  },

  images: {
    source: 'src/images',
    build: 'dest/assets/images'
  },

  favicons: {
    path: '{{rootPath}}assets/favicons/',
    source: 'src/favicons',
    build: 'dest/assets/favicons',
    html: 'src/partials/favicons.hbs'
  },

  html: {
    source: 'src/html',
    build: 'dest',
    metadata: {
      production,
      pkg
    },
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
    },
  },

  archive: {
    source: 'dest/**/*',
    build: 'archives'
  },

  notify: {
    title: pkg.name
  },

  env: 'development',
  production: production,
  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  }
};
