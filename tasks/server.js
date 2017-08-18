import gulp from 'gulp';
import browser from './browser';
import config from '../config';
import notifier from 'node-notifier';

// SERVER
// ------------------
// starts a local development server
gulp.task('server', () => {
  browser.init(
    {
      server: {
        baseDir: config.paths.build,
      },
      port: config.server.port,
      notify: config.server.notify,
      open: config.server.open,
    },
    () => {
      notifier.notify({
        title: config.notify.title,
        message: 'Browser starting',
      });
    }
  );
});

gulp.task('reload', (done) => {
  browser.reload();

  notifier.notify({
    title: config.notify.title,
    message: 'Browser reloaded',
  });

  done();
});
