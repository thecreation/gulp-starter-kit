import gulp from 'gulp';
import config from '../config';
import metalsmith from '../metalsmith';
import browser from './browser';

// HTML
// ------------------
// runs the Metalsmith build script to build the site
gulp.task('html', cb => {
  metalsmith(function(err) {
    if (err) throw err;
    browser.reload();
    cb();
  });
});
