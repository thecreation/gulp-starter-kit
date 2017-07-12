import config from './config';
import gulp from 'gulp';
import gutil from "gulp-util";
import browser from './tasks/browser';
import clean from './tasks/clean';
import copy from './tasks/copy';
import deploy from './tasks/deploy';
import fonts from './tasks/fonts';
import html from './tasks/html';
import images from './tasks/images';
import favicons from './tasks/favicons';
import scripts from './tasks/scripts';
import server from './tasks/server';
import styles from './tasks/styles';
import svgs from './tasks/svgs';
import usemin from './tasks/usemin';
import watch from './tasks/watch';
import prettier from './tasks/prettier';

gutil.log(gutil.colors.bold(`ℹ  ${config.name} v${config.version}`));

if (config.production) {
  gutil.log(gutil.colors.bold.green('🚚  Production Mode'));
} else {
  gutil.log(gutil.colors.bold.green('🔧  Development Mode'));
}

// GENERAL TASKS
// ------------------
gulp.task(
  'assets',
  gulp.parallel('copy', 'styles', 'scripts', 'images', 'svgs', 'favicons')
);

if (config.production) {
  gulp.task('build', gulp.series('clean', 'assets', 'html', 'usemin'));
} else {
  gulp.task('build', gulp.series('clean', 'assets', 'html'));
}

gulp.task('default', gulp.series('build', gulp.parallel('server', 'watch')));
