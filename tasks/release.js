import config from '../config';
import gulp from 'gulp';
import releaseIt from 'release-it';
import handleErrors from './utils/handleErrors';
import {argv} from 'yargs';

// RELEASE
// ------------------
// pushes site content onto a remote repository
gulp.task('release', function(done) {
  let options = {};
  options.increment = argv.increment || "patch";
  options.verbose = argv.verbose || true;
  options.debug = argv.debug || false;
  options.force = argv.force || false;
  options['dry-run'] = argv['dry-run'] || false;

  config.setEnv('production');

  releaseIt.execute(options).catch(handleErrors).finally(done);
});