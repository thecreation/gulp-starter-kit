import config from '../config';
import gulp from 'gulp';
import srcset from 'gulp-srcset';
import webpPlugin from 'imagemin-webp';
import mozJpegPlugin from 'imagemin-mozjpeg';
import gifLossyPlugin from 'imagemin-giflossy';
// import zopfliPlugin from 'imagemin-zopfli';
// import optipngPlugin from 'imagemin-optipng';
import pngquantPlugin from 'imagemin-pngquant';
import svgoPlugin from 'imagemin-svgo';
import plumber from 'gulp-plumber';
import browser from './browser';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';

gulp.task('srcset', function () {
  return gulp.src(`${config.images.source}/**/*.{png,jpg,svg,gif}`)
    .pipe(changed(`${config.images.build}`))
    .pipe(
      plumber({errorHandler: notify.onError('Error: <%= error.message %>')})
    )
    .pipe(srcset([{
      match: '**/*.png',
      width:  [1, 640, 960],
      format: ['webp', 'png']
    }], {
      processing: {
        webp: {
          quality: 100
        },
        jpg: {
          quality: 100
        },
        png: {}
      },
      optimization: {
        webp: webpPlugin({
          quality: 100
        }),
        jpg:  mozJpegPlugin({
          quality: 100,
          progressive: true
        }),
        png: pngquantPlugin({

        }),
        gif: gifLossyPlugin(),
        svg: svgoPlugin()
      },
      postfix: (calculatedWidth, width) => width == 1 ? '' : `@${calculatedWidth}`
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(`${config.images.build}`))
    .pipe(browser.stream())
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Srcset task complete',
          onLast: true,
        })
      )
    );
});
