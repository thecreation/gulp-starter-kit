import gulp    from 'gulp';
import config  from '../config';
import browser from './browser';

// WATCH TASKS
// ------------------
// watches for changes, recompiles & injects html + assets
gulp.task('watch:styles', () => {
  gulp.watch(
  `${config.assets.source}/styles/**/*.scss`,
  gulp.series('styles')
  );
});

gulp.task('watch:scripts', () => {
  gulp.watch(
  `${config.assets.source}/scripts/**/*.js`,
  gulp.series('scripts')
  );
});

gulp.task('watch:images', () => {
  gulp.watch(
  `${config.assets.source}/images/**/*`,
  gulp.series('images')
  );
});

gulp.task('watch:svgs', () => {
  gulp.watch(
  `${config.assets.source}/svgs/**/*`,
  gulp.series('svgs')
  );
});

gulp.task('watch:html', () => {
  // https://github.com/BrowserSync/browser-sync/issues/711
  function reload(done) {
    browser.reload();
    done();
  }

  gulp.watch([
    'src/html/**/*',
    'src/layouts/**/*',
    'src/partials/**/*',
    'config.js',
  ], gulp.series('html', reload));
});

gulp.task('watch:misc', () => {
  gulp.watch([
    'config.js'
  ], gulp.series(
    'html',
    'styles',
    'scripts',
    'svgs',
    'images'
  ));
});

gulp.task('watch', gulp.parallel(
  'watch:styles',
  'watch:scripts',
  'watch:images',
  'watch:svgs',
  'watch:html',
  'watch:misc'
));
