import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import changed from 'gulp-changed';
import config from '../config';
import browser from './browser';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';

gulp.task('svgs', () => {
  return gulp
    .src(`${config.svgs.source}/**/*`)
    .pipe(changed(`${config.svgs.build}`))
    .pipe(
      plumber({errorHandler: notify.onError('Error: <%= error.message %>')})
    )
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
        plugins: [
          {
            removeDesc: true,
          },
          {
            cleanupIDs: true,
          },
          {
            mergePaths: false,
          },
        ],
      })
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest(`${config.svgs.build}`))
    .pipe(browser.stream())
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Svgs task complete',
          onLast: true,
        })
      )
    );
});
