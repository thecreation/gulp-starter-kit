import gulp from 'gulp';
import config from '../config';
import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import named from 'vinyl-named';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import webpack from "webpack";
import cache from 'gulp-memory-cache';
import browser from './browser';
import gutil from "gulp-util";
import notify from 'gulp-notify';

const webpackConfig = config.production
  ? require("../webpack/prod.config.js")
  : require("../webpack/dev.config.js");

// SCRIPTS
// ------------------
gulp.task('lint:scripts', () => {
  return gulp
    .src(`${config.scripts.source}/scripts.js`, {
      base: './',
      since: gulp.lastRun('lint:scripts')
    })
    .pipe(eslint({ fix: false })) // see http://eslint.org/docs/rules/
    .pipe(eslint.format())
    .pipe(gulp.dest('.'));
});

// compiles / concatenates javascript & minifies it (production)
gulp.task('make:scripts', (callback) => {
  if (config.enable.webpack) {
    webpack(webpackConfig).run((err, stats) => {
      if (err) throw new gutil.PluginError("webpack", err);

      gutil.log(
        "[webpack]",
        stats.toString({
          assets: true,
          chunks: false,
          chunkModules: false,
          colors: true,
          hash: false,
          timings: true,
          version: false
        })
      );

      browser.reload();
      if (typeof callback === "function") callback();
    });
  } else {
    return gulp
      .src(`${config.scripts.source}/*.js`, {
        since: cache.lastMtime('concatJS')
      })
      .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
      .pipe(cache('concatJS'))
      .pipe(concat('scripts.js'))
      .pipe(gulpif(config.production, uglify()))
      .pipe(size({ gzip: true, showFiles: true }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(`${config.scripts.dest}`))
      .pipe(browser.stream());
  }
});

gulp.task('scripts', gulp.series('lint:scripts', 'make:scripts'));
