import gulp   from 'gulp';
import config from '../config';
import del    from 'del';

// Clean dest files
gulp.task('clean', () => {
  return del([`{config.paths.build}/**/*`]);
});
