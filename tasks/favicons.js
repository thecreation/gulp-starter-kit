import gulp from 'gulp';
import changed from 'gulp-changed';
import favicons from 'gulp-favicons';
import gutil from 'gulp-util';
import config from '../config';
import browser from './browser';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';
import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notifier from 'node-notifier';

gulp.task('make:favicons', () => {
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
          yandex: false
        },
        html: config.favicons.html,
        replace: true
      })
    )
    .on('error', gutil.log)
    .pipe(gulp.dest(`${config.favicons.build}`))
    .pipe(browser.stream());
});

gulp.task('favicons:fix', () => {
  return gulp
    .src(`${config.favicons.build}/*.{xml,json,webapp}`)
    .on('error', gutil.log)
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(replace('{{rootPath}}', '/'))
    .pipe(gulp.dest(`${config.favicons.build}`));
});

gulp.task(
  'favicons',
  gulp.series('make:favicons', 'favicons:fix', done => {
    if (config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Favicons task complete'
      });
    }

    done();
  })
);
