import config from './config';
import gulp from 'gulp';

// GENERAL TASKS
// ------------------
gulp.task('assets', gulp.parallel(
  'copy',
  'styles',
  'scripts',
  'images'
));

gulp.task('build', gulp.series(
  'clean',
  'assets',
  'html'
));

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'server',
    'watch'
  )
));
