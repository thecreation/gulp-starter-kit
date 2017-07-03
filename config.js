const envDev = ((process.env.NODE_ENV || '').trim().toLowerCase() !== 'production');
import pkg from './package';

export default {
  metadata: {
    envDev,
    pkg
  },
  paths: {
    source: './src/html',
    build: 'dest',
  },
  assets: {
    source: 'src',
    build: 'dest/assets',
  },
  enable: {
    webpack: false,
  },
  server: {
    port: 4000,
    notify: true,
    open: true,
  },
  envDev,
  styles: {
    prefix: [
      // For more browsers, see https://github.com/ai/browserslist
      '> 1%',
      'last 3 versions',
      'IE >= 9',
    ],
    include: [
      // 'node_modules',
      // 'bower_components'
    ],
  },
  scripts: {
    webpack: {
      watch: false,
      // entry: {},
      // output: {},
      // plugins: []
    },
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
      removeAttributeQuotes: true,
    },
  },
};
