import gulp from 'gulp';
import bump from 'gulp-bump';

gulp.task('version:major', () => {
  return gulp
    .src('package.json')
    .pipe(bump({type: 'major'}))
    .pipe(gulp.dest('./'));
});

gulp.task('version:minor', () => {
  return gulp
    .src('package.json')
    .pipe(bump({type: 'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('version:patch', () => {
  return gulp
    .src('package.json')
    .pipe(bump({type: 'patch'}))
    .pipe(gulp.dest('./'));
});

gulp.task('version:reset', () => {
  return gulp
    .src('package.json')
    .pipe(bump({version: '0.1.0'}))
    .pipe(gulp.dest('./'));
});
