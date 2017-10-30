import fs from 'fs';
import config from '../../config';
import path from 'path';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper("root", function(options) {
    let file;

    if(options.data.file) {
      file = options.data.file;
    } else {
      file = options.data.root.file;
    }

    let relative = path.relative(path.relative(file.cwd, path.dirname(file.path)), config.html.pages);
    return new Handlebars.SafeString(relative);
  });
};
