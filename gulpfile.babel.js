import config from './config';
import gulp from 'gulp';

import browser from './tasks/browser';
import clean from './tasks/clean';
import copy from './tasks/copy';
import deploy from './tasks/deploy';
import fonts from './tasks/fonts';
import html from './tasks/html';
import images from './tasks/images';
import scripts from './tasks/scripts';
import server from './tasks/server';
import styles from './tasks/styles';
import svgs from './tasks/svgs';
import usemin from './tasks/usemin';
import watch from './tasks/watch';
import prettier from './tasks/prettier';

// GENERAL TASKS
// ------------------
gulp.task(
  'assets',
  gulp.parallel('copy', 'styles', 'scripts', 'images', 'svgs')
);

gulp.task('build', gulp.series('clean', 'assets', 'html', 'usemin'));

gulp.task('default', gulp.series('build', gulp.parallel('server', 'watch')));
