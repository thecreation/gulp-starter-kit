import gulp from 'gulp';
import config from '../config';
import prettier from 'gulp-nf-prettier';
import changed from 'gulp-changed';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';

gulp.task('prettier', () => {
  return gulp
    .src(`${config.scripts.source}/**/*.js`, { base: './' })
    .pipe(changed(`${config.scripts.source}`))
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(
      prettier({
        parser: 'flow',
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        bracketSpacing: true
      })
    )
    .pipe(size({ showFiles: true }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./'))
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Prettier task complete',
          onLast: true
        })
      )
    );
});
