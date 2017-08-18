import gulp from 'gulp';
import config from '../config';
import del from 'del';
import notifier from 'node-notifier';

// Clean dest files
gulp.task('clean', (done) => {
  return del([`${config.paths.build}/**/*`]).then(() => {
    if (config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Clean task complete',
      });
    }

    done();
  });
});
