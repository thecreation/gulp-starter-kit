import gulp from 'gulp';
import changed from 'gulp-changed';
import config from '../config';
import browser from './browser';

// FONTS
// ------------------
gulp.task('fonts', () => {
  return gulp
    .src(`${config.assets.source}/fonts/**/*`)
    .pipe(changed(`${config.assets.build}/fonts`))
    .pipe(gulp.dest(`${config.assets.build}/fonts`))
    .pipe(browser.stream());
});
