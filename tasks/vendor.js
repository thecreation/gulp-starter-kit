import config from '../config';
import gulp from 'gulp';
import notifier from 'node-notifier';
import AssetsManager from 'assets-manager';

gulp.task('vendor', (done) => {
  // see https://github.com/amazingSurge/assets-manager
  const manager = new AssetsManager('manifest.json', config.vendor);

  manager.copyPackages().then(()=>{
    if (config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Vendor task complete',
      });
    }
    done();
  });
});

gulp.task('clean:vendor', (done) => {
  const manager = new AssetsManager('manifest.json', config.vendor);

  manager.cleanPackages().then(()=>{
    if (config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Vendor clean task complete',
      });
    }
    done();
  });
});
