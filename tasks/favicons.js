import gulp from 'gulp';
import changed from 'gulp-changed';
import favicons from 'gulp-favicons';
import gutil from 'gulp-util';
import config from '../config';
import browser from './browser';
import notify from 'gulp-notify';
import replace from 'gulp-replace';
import filter from 'gulp-filter';

gulp.task('favicons', () => {
  return gulp
    .src(`${config.favicons.source}/favicon.png`)
    .pipe(changed(`${config.favicons.build}`))
    .pipe(
      favicons({
        appName: config.name,
        appDescription: config.description,
        developerName: null,
        developerURL: null,
        background: 'transparent',
        path: config.favicons.path,
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
          yandex: false,
        },
        html: config.favicons.html,
        replace: true,
      })
    )
    .on('error', gutil.log)
    .pipe(gulp.dest(`${config.favicons.build}`))
    .pipe(filter('**/*.{xml,json,webapp}'))
    .pipe(replace('{{rootPath}}', '/'))
    .pipe(gulp.dest(`${config.favicons.build}`))
    .pipe(browser.stream())
    .pipe(
      notify({
        title: config.notify.title,
        message: 'Favicons task complete',
        onLast: true,
      })
    );
});
