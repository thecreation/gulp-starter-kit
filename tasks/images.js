import gulp from 'gulp';
import config from '../config';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';
import imagemin from 'gulp-imagemin';
import mozJpegPlugin from 'imagemin-mozjpeg';
import gifLossyPlugin from 'imagemin-giflossy';
import pngquantPlugin from 'imagemin-pngquant';
import svgoPlugin from 'imagemin-svgo';
import size from 'gulp-size';
import changed from 'gulp-changed';
import browser from './browser';
import plumber from 'gulp-plumber';


// IMAGES
// ------------------
// compressing images (unless they already got compressed)
gulp.task('images', () => {
  return gulp
    .src(`${config.images.source}/**/*.+(png|jpg|jpeg|gif|svg)`)
    .pipe(changed(`${config.images.build}`))
    .pipe(
      plumber({errorHandler: notify.onError('Error: <%= error.message %>')})
    )
    .pipe(
      imagemin([
        mozJpegPlugin({progressive: true}),
        pngquantPlugin(),
        gifLossyPlugin(),
        svgoPlugin({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ])
    )
    .pipe(size({showFiles: true}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(`${config.images.build}`))
    .pipe(browser.stream())
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Images task complete',
          onLast: true,
        })
      )
    );
});
