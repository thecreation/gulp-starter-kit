import gulp from 'gulp';
import changed from 'gulp-changed';
import favicons from "gulp-favicons";
import gutil from "gulp-util";
import config from '../config';
import browser from './browser';

gulp.task("favicons", () => {
  return gulp.src(`${config.assets.source}/favicons/favicon.png`)
    .pipe(changed(`${config.assets.build}/favicons`))
    .pipe(favicons({
      appName: config.title,
      appDescription: config.description,
      developerName: null,
      developerURL: null,
      background: 'transparent',
      path: './assets/favicons/',
      display: 'standalone',
      orientation: 'portrait',
      version: config.version,
      logging: false,
      online: false,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        windows: true,
        yandex: true
      }
    }))
    .on("error", gutil.log)
    .pipe(gulp.dest(`${config.assets.build}/favicons`))
    .pipe(browser.stream());
});

