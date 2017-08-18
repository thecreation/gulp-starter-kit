import gulp from 'gulp';
import changed from 'gulp-changed';
import config from '../config';
import browser from './browser';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';

// FONTS
// ------------------
gulp.task('fonts', () => {
  return gulp
    .src(`${config.fonts.source}/**/*.+(css|woff2|woff|eot|ttf|svg)`)
    .pipe(changed(`${config.fonts.build}`))
    .pipe(gulp.dest(`${config.fonts.build}`))
    .pipe(browser.stream())
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Fonts task complete',
          onLast: true,
        })
      )
    );
});
