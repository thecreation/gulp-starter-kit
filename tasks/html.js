import gulp from 'gulp';
import config from '../config';
import metalsmith from '../metalsmith';
import browser from './browser';
import notifier from 'node-notifier';

// HTML
// ------------------
// runs the Metalsmith build script to build the site
gulp.task('html', (done) => {
  metalsmith(function(err) {
    if (err) throw err;
    browser.reload();

    if(config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Html task complete'
      });
    }

    done();
  });
});
