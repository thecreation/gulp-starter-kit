import fs from 'fs';
import config from '../../config';
import path from 'path';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper("assets", function(options) {
    let file;

    if(options.data.file) {
      file = options.data.file;
    } else {
      file = options.data.root.file;
    }

    let relative = path.relative(config.html.pages, path.relative(file.cwd, path.dirname(file.path)));
    let currentPath = path.join(config.html.build, relative);

    return new Handlebars.SafeString(path.relative(currentPath, config.assets.build));
  });
};
