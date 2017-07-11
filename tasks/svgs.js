import gulp    from 'gulp';
import svgmin  from 'gulp-svgmin';
import changed from 'gulp-changed';
import config  from '../config';
import browser from './browser';

gulp.task('svgs', () => {
  return gulp.src(`${config.assets.source}/svgs/**/*`)
    .pipe(changed(`${config.assets.build}/svgs`))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      },
      plugins: [{
        removeDesc: true
      }, {
        cleanupIDs: true
      }, {
        mergePaths: false
      }]
    }))
    .pipe(gulp.dest(`${config.assets.build}/svgs`))
    .pipe(browser.stream());
});
