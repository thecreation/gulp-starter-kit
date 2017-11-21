import gulp from 'gulp';
import config from '../config';
import hb from 'gulp-hb';
import frontMatter from 'gulp-front-matter';
import plumber from 'gulp-plumber';
import browser from './browser';
import notifier from 'node-notifier';
import htmlhint from 'gulp-htmlhint';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';

// HTML
// ------------------
// lints html using htmlhint
gulp.task('lint:html', () => {
  return gulp
    .src(`${config.html.build}/**/*.html`, {
      since: gulp.lastRun('lint:html'),
    })
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter())
    .pipe(gulpif(config.failOnError, htmlhint.failAfterError()));
});

// build the site
gulp.task('make:html', (done) => {
  let hbStream = hb({
      debug: false
    })
    // Partials
    .partials(config.html.partials + '/**/*.hbs')
    .partials(config.html.layouts + '/**/*.hbs')

    // Data
    .data(config.html.data + '/**/*.{js,json}')
    .data(config.html.metadata)

    // Helpers
    .helpers(require('handlebars-layouts'))
    .helpers(require('handlebars-helpers')(['comparison','markdown']))
    .helpers(config.html.helpers + '/*.js');

  return gulp.src(config.html.pages + '/**/*.hbs')
    //.pipe(plumber())
    .pipe(frontMatter({
      property: 'data.frontMatter'
    }))
    .pipe(hbStream)
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(config.html.build));
});

gulp.task(
  'html',
  gulp.series('make:html', 'lint:html', (done) => {
    if (config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Html task complete',
      });
    }

    done();
  })
);

