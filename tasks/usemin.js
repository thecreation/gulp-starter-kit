import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import flatmap from 'gulp-flatmap';
import usemin from 'gulp-usemin';
import cssnano from 'gulp-cssnano';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';

gulp.task('usemin', () => {
  return gulp
    .src(`${config.html.build}/**/*.html`)
    .pipe(
      flatmap(stream => {
        return stream
          .pipe(
            plumber({
              errorHandler: notify.onError('Error: <%= error.message %>')
            })
          )
          .pipe(
            gulpif(
              config.production,
              usemin({
                // see https://www.npmjs.com/package/gulp-usemin
                css: [cssnano()],
                js: [uglify()]
              })
            )
          )
          .pipe(gulp.dest(config.html.build));
      })
    )
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Usemin task complete',
          onLast: true
        })
      )
    );
});
