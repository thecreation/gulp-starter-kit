import config from '../config';
import gulp from 'gulp';
import zip from 'gulp-zip';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';

gulp.task('archive', () => {
  return gulp
    .src(config.archive.source)
    .pipe(zip(`${config.version}.zip`))
    .pipe(gulp.dest(config.archive.build))
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Archive task complete',
        })
      )
    );
});
