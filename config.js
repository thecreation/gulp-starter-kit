import pkg from './package';
import {argv} from 'yargs';
const production = argv.production || argv.prod || false;

export default {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  banner: `/**
* ${pkg.name} v${pkg.version}
* ${pkg.homepage}
*
* Copyright (c) ${pkg.author}
* Released under the ${pkg.license} license
*/
`,

  root: __dirname,
  paths: {
    source: 'src',
    build: 'dist'
  },

  assets: {
    source: 'src/assets',
    build: 'dist/assets'
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
    build: 'dist/assets/styles',
    include: [
      // 'node_modules'
    ]
  },

  scripts: {
    bundler: 'rollup', // rollup, webpack, default
    source: 'src/scripts',
    build: 'dist/assets/scripts'
  },

  html: {
    source: 'src/html',
    build: 'dist',
    metadata: {
      production,
      pkg
    }
  },

  fonts: {
    source: 'src/fonts',
    build: 'dist/assets/fonts'
  },

  sprite: {
    name: 'sprite.svg',
    source: 'src/sprite',
    build: 'dist/assets/svgs'
  },

  svgs: {
    source: 'src/svgs',
    build: 'dist/assets/svgs'
  },

  images: {
    source: 'src/images',
    build: 'dist/assets/images'
  },

  favicons: {
    path: '{{rootPath}}assets/favicons/',
    source: 'src/favicons',
    build: 'dist/assets/favicons',
    html: 'src/partials/favicons.hbs'
  },

  vendor: {
    manifest: 'manifest.json',
    dest: 'dist/assets/vendor',
    flattenPackages: false,
    paths: {
      css: '${dest}/${package}/${file}',
      js: '${dest}/${package}/${file}',
      fonts: '${dest}/${package}/${file}'
    }
  },

  archive: {
    source: 'dist/**/*',
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
