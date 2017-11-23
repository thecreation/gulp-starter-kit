import gulp from 'gulp';
import config from '../config';
import * as prettier from 'gulp-plugin-prettier';
import changed from 'gulp-changed';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';
import postcss from 'gulp-postcss';
import syntaxScss from 'postcss-scss';

gulp.task('beautify:scripts', () => {
  return gulp
    .src(`${config.scripts.source}/**/*.js`, {
      base: './', since: gulp.lastRun('beautify:scripts'),
    })
    .pipe(changed(`${config.scripts.source}`))
    .pipe(
      plumber({errorHandler: notify.onError('Error: <%= error.message %>')})
    )
    .pipe(
      prettier.format()
    )
    .pipe(size({showFiles: true}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./'))
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Beautify js task complete',
          onLast: true,
        })
      )
    );
});

gulp.task('beautify:styles', () => {
  return gulp
    .src(`${config.styles.source}/**/*.scss`, {
      base: './',
      since: gulp.lastRun('beautify:styles'),
    })
    .pipe(changed(`${config.styles.source}`))
    .pipe(
      plumber({errorHandler: notify.onError('Error: <%= error.message %>')})
    )
    .pipe(
      prettier.format()
    )
    .pipe(size({showFiles: true}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./'))
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Beautify css task complete',
          onLast: true,
        })
      )
    );
});

gulp.task('beautify', gulp.series('beautify:scripts', 'beautify:styles'));
