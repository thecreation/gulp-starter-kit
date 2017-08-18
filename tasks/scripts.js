import gulp from 'gulp';
import config from '../config';
import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import uglifyjs from 'uglify-js';
import composer from 'gulp-uglify/composer';
import webpack from 'webpack';
import browser from './browser';
import gutil from 'gulp-util';
import notify from 'gulp-notify';
import notifier from 'node-notifier';
import include from 'gulp-include';
import babel from 'gulp-babel';
import handleErrors from './utils/handleErrors';
import rollup from 'gulp-rollup';
import header from 'gulp-header';

// SCRIPTS
// ------------------
gulp.task('lint:scripts', () => {
  return gulp
    .src(`${config.scripts.source}/scripts.js`, {
      base: './',
      since: gulp.lastRun('lint:scripts'),
    })
    .pipe(eslint({fix: true})) // see http://eslint.org/docs/rules/
    .pipe(eslint.format())
    .pipe(gulp.dest('.'));
});

const uglify = composer(uglifyjs, console);

// compiles / concatenates javascript & minifies it (production)
if (config.scripts.bundler === 'webpack') {
  let webpackConfig = config.production
    ? require('../webpack/prod.config.js')
    : require('../webpack/dev.config.js');

  gulp.task('make:scripts', (done) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) throw new gutil.PluginError('webpack', err);

      gutil.log(
        '[webpack]',
        stats.toString({
          assets: true,
          chunks: false,
          chunkModules: false,
          colors: true,
          hash: false,
          timings: true,
          version: false,
        })
      );

      browser.reload();
      done();
    });
  });
} else if (config.scripts.bundler === 'rollup') {
  let rollupConfig = config.production
    ? require('../rollup/prod.config.js')
    : require('../rollup/dev.config.js');

  rollupConfig = Object.assign(rollupConfig, {
    rollup: require('rollup'),
    allowRealFiles: true,
  });

  gulp.task('make:scripts', (done) => {
    return gulp
      .src(`${config.scripts.source}/**/*.js`)
      .on('error', handleErrors)
      .pipe(
        plumber({
          errorHandler: notify.onError('Error: <%= error.message %>'),
        })
      )
      .pipe(rollup(rollupConfig))
      .pipe(babel())
      .pipe(gulpif(config.production, uglify()))
      .pipe(gulpif(config.production, header(config.banner)))
      .pipe(size({gzip: true, showFiles: true}))
      .pipe(gulp.dest(`${config.scripts.build}`))
      .pipe(browser.stream());
  });
} else {
  gulp.task('make:scripts', (done) => {
    return gulp
      .src(`${config.scripts.source}/*.js`)
      .pipe(
        plumber({
          errorHandler: notify.onError('Error: <%= error.message %>'),
        })
      )
      .pipe(
        include({
          // see https://www.npmjs.com/package/gulp-include
          includePaths: [
            config.root + '/node_modules',
            config.root + '/src/scripts',
          ],
        })
      )
      .pipe(babel())
      .pipe(gulpif(config.production, uglify()))
      .pipe(gulpif(config.production, header(config.banner)))
      .pipe(size({gzip: true, showFiles: true}))
      .pipe(plumber.stop())
      .pipe(gulp.dest(`${config.scripts.build}`))
      .pipe(browser.stream());
  });
}

gulp.task(
  'scripts',
  gulp.series('lint:scripts', 'make:scripts', (done) => {
    if (config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Scripts task complete',
      });
    }

    done();
  })
);

