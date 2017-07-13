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
      // 'node_modules'
    ]
  },

  scripts: {
    bundler: 'default', // rollup, webpack, default
    source: 'src/scripts',
    build: 'dest/assets/scripts'
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
    }
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

  vendor: {
    manifest: 'manifest.json',
    dest: 'dest/assets/vendor',
    flattenPackages: false,
    paths: {
      css: '${dest}/${package}/${file}',
      js: '${dest}/${package}/${file}',
      fonts: '${dest}/${package}/${file}'
    }
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
