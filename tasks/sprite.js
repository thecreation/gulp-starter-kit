import gulp from 'gulp';
import sprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';
import config from '../config';
import browser from './browser';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';

gulp.task('sprite', () => {
  return gulp.src(`${config.sprite.source}/**/*.svg`)
    .pipe(
      plumber({errorHandler: notify.onError('Error: <%= error.message %>')})
    )
    .pipe(sprite({
      mode: {
        inline: true,
        symbol: { // symbol mode to build the SVG
          dest: '', // destination foldeer
          sprite: config.sprite.name, //sprite name
          example: false // do not build sample page
        }
      },
      svg: {
        xmlDeclaration: false, // strip out the XML attribute
        doctypeDeclaration: false // don't include the !DOCTYPE declaration
      }
    }))
    .pipe(gulp.dest(config.sprite.build))
    .pipe(browser.stream())
    .pipe(
      gulpif(
        config.enable.notify,
        notify({
          title: config.notify.title,
          message: 'Sprite task complete',
          onLast: true,
        })
      )
    );
});
