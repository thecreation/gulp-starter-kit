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
import { createConfig as webpackConfig } from "../webpack.config";

// SCRIPTS
// ------------------
gulp.task('lint:scripts', () => {
  return gulp
    .src(`${config.assets.source}/scripts/scripts.js`, {
      base: './',
      since: gulp.lastRun('lint:scripts')
    })
    .pipe(eslint({ fix: false })) // see http://eslint.org/docs/rules/
    .pipe(eslint.format())
    .pipe(gulp.dest('.'));
});

// compiles / concatenates javascript & minifies it (production)
gulp.task('make:scripts', (cb) => {
  if (config.enable.webpack) {
    webpack(webpackConfig(config.env)).run((err, stats) => {
      if (err) throw new gutil.PluginError("webpack", err);

      gutil.log(
        "[webpack]",
        stats.toString({
          colors: true,
          chunks: false
        })
      );

      browser.reload();
      if (typeof cb === "function") cb();
    });
  } else {
    return gulp
      .src(`${config.assets.source}/scripts/*.js`, {
        since: cache.lastMtime('concatJS')
      })
      .pipe(cache('concatJS'))
      .pipe(concat('scripts.js'))
      .pipe(gulpif(!config.envDev, uglify()))
      .pipe(size({ gzip: true, showFiles: true }))
      .pipe(gulp.dest(`${config.assets.build}/scripts`))
      .pipe(browser.stream());
  }
});

gulp.task('scripts', gulp.series('lint:scripts', 'make:scripts'));
