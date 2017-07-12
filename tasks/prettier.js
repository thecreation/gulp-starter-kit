import gulp     from 'gulp';
import config   from '../config';
import prettier from 'gulp-nf-prettier';
import changed  from 'gulp-changed';
import size     from 'gulp-size';

gulp.task('prettier', () => {
  return gulp.src(`${config.assets.source}/scripts/**/*.js`, { base: './' })
    .pipe(changed(`${config.assets.source}/scripts`))
    .pipe(prettier({
      parser: 'flow',
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      bracketSpacing: true
    }))
    .pipe(size({showFiles: true}))
    .pipe(gulp.dest('./'))
});
