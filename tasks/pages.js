import gulp from 'gulp';
import config from '../config';
import ghPages from 'gulp-gh-pages';

// DEPLOY
// ------------------
// pushes site content onto a remote repository
gulp.task('pages', () => {
  return gulp.src(`${config.paths.build}/**/*`).pipe(ghPages());
});
