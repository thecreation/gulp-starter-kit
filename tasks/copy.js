import gulp    from 'gulp';
import config  from '../config';
import browser from './browser';

// Copy assets to dist on build task
gulp.task('copy', () => {
  return gulp.src(`${config.assets.source}/assets/**/*`)
    .pipe(gulp.dest(`${config.assets.build}`))
    .pipe(browser.stream());
});
