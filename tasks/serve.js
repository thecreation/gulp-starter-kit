import gulp  from 'gulp';
import browser  from './browser';

// SERVER
// ------------------
// starts a local development server
gulp.task('server', () => {
  browser.init({
    server: {
      baseDir: config.paths.build,
    },
    port: config.server.port,
    notify: config.server.notify,
    open: config.server.open,
  });
});
