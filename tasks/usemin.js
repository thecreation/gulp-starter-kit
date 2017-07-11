import gulp    from 'gulp';
import config  from '../config';
import plumber from 'gulp-plumber';
import flatmap from 'gulp-flatmap';
import usemin  from 'gulp-usemin';
import cssnano from 'gulp-cssnano';
import uglify  from 'gulp-uglify';

gulp.task('usemin', () => {
  return gulp.src(`${config.paths.build}/**/*.html`)
    .pipe(flatmap((stream) => {
      return stream
        .pipe(plumber())
        .pipe(usemin({ // see https://www.npmjs.com/package/gulp-usemin
            css: [cssnano()],
            js: [uglify()]
        }))
        .pipe(gulp.dest(config.paths.build));
    }));
});
