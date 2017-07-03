import cache from 'gulp-memory-cache';
import changed from 'gulp-changed';
import concat from 'gulp-concat';
import config from './config';
import eslint from 'gulp-eslint';
import {exec} from 'child_process';
import ghPages from 'gulp-gh-pages';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import minify from 'gulp-clean-css';
import named from 'vinyl-named';
import plumber from 'gulp-plumber';
import pngquant from 'imagemin-pngquant';
import postcss from 'gulp-postcss';
import prefix from 'autoprefixer';
import reporter from 'postcss-reporter';
import sass from 'gulp-sass';
import size from 'gulp-size';
import stylelint from 'stylelint';
import syntaxScss from 'postcss-scss';
import uglify from 'gulp-uglify';
import webpack from 'webpack-stream';
import wp from 'webpack';
import browserSync from 'browser-sync';
import metalsmith from './metalsmith';
import del from 'del';

const browser = browserSync.create();

// STYLES
// ------------------
// lints styles using stylelint (config under 'stylelint' in package.json)
gulp.task('lint:styles', () => {
  return gulp.src(`${config.assets.source}/styles/**/*.scss`, {
      since: gulp.lastRun('lint:styles')
    })
    .pipe(postcss([
      stylelint(), // see http://stylelint.io/user-guide/example-config/
      reporter({clearMessages: true}),
    ], {syntax: syntaxScss}));
});

// compiles sass into css & minifies it (production)
gulp.task('make:styles', () => {
  const onError = function(err) {
    console.log(err);
    this.emit('end');
  };

  return gulp.src(`${config.assets.source}/styles/*.scss`)
   .pipe(plumber({errorHandler: onError}))
   .pipe(sass({
     precision: 10, // https://github.com/sass/sass/issues/1122
     includePaths: config.styles.include,
   }))
   .pipe(postcss([
     prefix({browsers: config.styles.prefix}),
   ]))
   .pipe(gulpif(!config.envDev, minify()))
   .pipe(size({gzip: true, showFiles: true}))
   .pipe(gulp.dest(`${config.assets.build}/styles`))
   .pipe(browser.stream());
});

gulp.task('styles', gulp.series(
  'lint:styles',
  'make:styles'
));

// SCRIPTS
// ------------------
gulp.task('lint:scripts', () => {
  return gulp.src(`${config.assets.source}/scripts/scripts.js`, {
      base: './',
      since: gulp.lastRun('lint:scripts')
    })
    .pipe(eslint({fix: true})) // see http://eslint.org/docs/rules/
    .pipe(eslint.format())
    .pipe(gulp.dest('.'));
});

// compiles / concatenates javascript & minifies it (production)

gulp.task('make:scripts', () => {
  if (config.enable.webpack) {
    // Array of used webpack plugins
    const webpackPlugins = [];

    return gulp.src(`${config.assets.source}/scripts/scripts.js`)
      .pipe(named())
      .pipe(webpack(config.scripts.webpack))
      .pipe(gulpif(!config.metadata.envDev, uglify()))
      .pipe(size({gzip: true, showFiles: true}))
      .pipe(gulp.dest(`${config.assets.build}/scripts`))
      .pipe(browser.stream());
  } else {
    return gulp.src(`${config.assets.source}/scripts/*.js`, {since: cache.lastMtime('concatJS')})
      .pipe(cache('concatJS'))
      .pipe(concat('scripts.js'))
      .pipe(gulpif(!config.envDev, uglify()))
      .pipe(size({gzip: true, showFiles: true}))
      .pipe(gulp.dest(`${config.assets.build}/scripts`))
      .pipe(browser.stream());
  }
});

gulp.task('scripts', gulp.series(
  'lint:scripts',
  'make:scripts'
));

// MISC
// ------------------
// clean dest files
gulp.task('clean', () => {
  return del([`{config.paths.build}/**/*`]);
});

// copy assets files
gulp.task('copy', () => {
  return gulp.src(`${config.assets.source}/assets/**/*`)
    .pipe(gulp.dest(`${config.assets.build}`))
    .pipe(browser.stream());
});

// IMAGES
// ------------------
// compressing images (unless they already got compressed)
gulp.task('images', () => {
  return gulp.src(`${config.assets.source}/images/**/*.+(png|jpg|jpeg|gif|svg)`)
   .pipe(changed(`${config.assets.build}/images`))
   .pipe(imagemin({
     progressive: true,
     use: [pngquant()],
   }))
   .pipe(size({showFiles: true}))
   .pipe(gulp.dest(`${config.assets.build}/images`))
   .pipe(browser.stream());
});

// FONTS
// ------------------

gulp.task('fonts', () => {
  return gulp.src(`${config.assets.source}/fonts/**/*`)
    .pipe(changed(`${config.assets.build}/fonts`))
    .pipe(gulp.dest(`${config.assets.build}/fonts`))
    .pipe(browser.stream());
});

// HTML
// ------------------
// runs the Metalsmith build script to build the site
gulp.task('html', (cb) => {
  metalsmith(function(err) {
    if (err) throw err;
    browserSync.reload();
    cb();
  });
});

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

// WATCH TASKS
// ------------------
// watches for changes, recompiles & injects html + assets
gulp.task('watch:styles', () => {
  gulp.watch(
  `${config.assets.source}/styles/**/*.scss`,
  gulp.series('styles')
  );
});

gulp.task('watch:scripts', () => {
  gulp.watch(
  `${config.assets.source}/scripts/**/*.js`,
  gulp.series('scripts')
  );
});

gulp.task('watch:images', () => {
  gulp.watch(
  `${config.assets.source}/images/**/*`,
  gulp.series('images')
  );
});

gulp.task('watch:code', () => {
  // https://github.com/BrowserSync/browser-sync/issues/711
  function reload(done) {
    browser.reload();
    done();
  }

  gulp.watch([
    'src/html/**/*',
    'src/layouts/**/*',
    'src/partials/**/*',
    'config.js',
  ], gulp.series('html', reload));
});

gulp.task('watch', gulp.parallel(
  'watch:styles',
  'watch:scripts',
  'watch:images',
  'watch:code'
));

// DEPLOY
// ------------------
// pushes site content onto a remote repository

gulp.task('deploy', () => gulp.src(`${config.paths.build}/**/*`)
  .pipe(ghPages()));

// GENERAL TASKS
// ------------------

gulp.task('assets', gulp.parallel(
  'copy',
  'styles',
  'scripts',
  'images'
));

gulp.task('build', gulp.series(
  'clean',
  'assets',
  'html'
));

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'server',
    'watch'
  )
));
