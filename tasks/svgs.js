import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import changed from 'gulp-changed';
import config from '../config';
import browser from './browser';
import plumber from 'gulp-plumber';

gulp.task('svgs', () => {
  return gulp
    .src(`${config.svgs.source}/**/*`)
    .pipe(changed(`${config.svgs.build}`))
    .pipe(plumber())
    .pipe(
      svgmin({
        js2svg: {
          pretty: true
        },
        plugins: [
          {
            removeDesc: true
          },
          {
            cleanupIDs: true
          },
          {
            mergePaths: false
          }
        ]
      })
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest(`${config.svgs.build}`))
    .pipe(browser.stream());
});
