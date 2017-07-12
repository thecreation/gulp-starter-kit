import gulp from 'gulp';
import { exec } from 'child_process';
import releaseIt from 'release-it';
import argv from 'argv';
import handleErrors from './utils/handleErrors';
import notifier from 'node-notifier';

argv.option([
  {
    name: 'increment',
    short: 'i',
    type: 'string',
    description: `Increment "major", "minor", "patch", or "pre*" version; or specify version [default: "patch"]'`
  },
  {
    name: 'verbose',
    short: 'o',
    type: 'boolean',
    description: `Verbose output`
  },
  {
    name: 'debug',
    short: 'e',
    type: 'boolean',
    description: `Output exceptions`
  },
  {
    name: 'force',
    short: 'f',
    type: 'boolean',
    description: `Allow empty Git commit, force tag.`
  },
  {
    name: 'message',
    short: 'm',
    type: 'string',
    description: `Commit message [default: "Release %s"]`
  },
  {
    name: 'dry-run',
    short: 'd',
    type: 'boolean',
    description: `Do not touch or write anything, but show the commands and interactivity.`
  }
]);

gulp.task('release', (done) => {
  let args = argv.run();

  releaseIt.execute(args.options).catch(handleErrors).finally(function() {
    if(config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Release task complete'
      });
    }

    done();
  });
});
