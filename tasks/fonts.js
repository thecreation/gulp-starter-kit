import gulp from 'gulp';
import changed from 'gulp-changed';
import config from '../config';
import browser from './browser';

// FONTS
// ------------------
gulp.task('fonts', () => {
  return gulp
    .src(`${config.fonts.source}/**/*.+(woff2|woff|eot|ttf|svg)`)
    .pipe(changed(`${config.fonts.build}`))
    .pipe(gulp.dest(`${config.fonts.build}`))
    .pipe(browser.stream());
});
