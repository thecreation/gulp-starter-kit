import gulp from 'gulp';
import config from '../config';
import metalsmith from '../metalsmith';
import browser from './browser';
import notifier from 'node-notifier';
import htmlhint from 'gulp-htmlhint';

// HTML
// ------------------
// lints html using htmlhint
gulp.task('lint:html', () => {
  return gulp
    .src(`${config.html.build}/**/*.html`, {
      since: gulp.lastRun('lint:html')
    })
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter());
});

// runs the Metalsmith build script to build the site
gulp.task('make:html', (done) => {
  metalsmith(function(err) {
    if (err) throw err;
    browser.reload();

    done();
  });
});

gulp.task('html', gulp.series('make:html', 'lint:html', (done) => {
  if(config.enable.notify) {
    notifier.notify({
      title: config.notify.title,
      message: 'Html task complete'
    });
  }

  done();
}));
