import config from './config';
import gulp from 'gulp';
import gutil from 'gulp-util';
import requiredir from 'require-dir';

gutil.log(gutil.colors.bold(`ℹ  ${config.name} v${config.version}`));

if (config.production) {
  gutil.log(gutil.colors.bold.green('🚚  Production Mode'));
} else {
  gutil.log(gutil.colors.bold.green('🔧  Development Mode'));
}
requiredir('./tasks');

gulp.task(
  'assets',
  gulp.parallel('copy', 'vendor', 'styles', 'scripts', 'images', 'sprite', 'svgs', 'favicons')
);
gulp.task('build', gulp.series('clean', 'assets', 'html', 'usemin'));
gulp.task('dev', gulp.series('build', gulp.parallel('server', 'watch')));
gulp.task('default', gulp.series('dev'));

gulp.task('version', gulp.series('version:patch'));
gulp.task('publish', gulp.series('archive'));
gulp.task('deploy', gulp.series('pages'));
