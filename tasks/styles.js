import gulp from 'gulp';
import config from '../config';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import stylelint from 'stylelint';
import postcss from 'gulp-postcss';
import syntaxScss from 'postcss-scss';
import reporter from 'postcss-reporter';
import minify from 'gulp-clean-css';
import browser from './browser';

// STYLES
// ------------------
// lints styles using stylelint (config under 'stylelint' in package.json)
gulp.task('lint:styles', () => {
  return gulp
    .src(`${config.assets.source}/styles/**/*.scss`, {
      since: gulp.lastRun('lint:styles')
    })
    .pipe(
      postcss(
        [
          stylelint(), // see http://stylelint.io/user-guide/example-config/
          reporter({ clearMessages: true })
        ],
        { syntax: syntaxScss }
      )
    );
});

// compiles sass into css & minifies it (production)
gulp.task('make:styles', () => {
  const onError = function(err) {
    console.log(err);
    this.emit('end');
  };

  return gulp
    .src(`${config.assets.source}/styles/*.scss`)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(
      sass({
        precision: 10, // https://github.com/sass/sass/issues/1122
        includePaths: config.styles.include
      })
    )
    .pipe(postcss())
    .pipe(gulpif(!config.envDev, minify()))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(`${config.assets.build}/styles`))
    .pipe(browser.stream());
});

gulp.task('styles', gulp.series('lint:styles', 'make:styles'));
