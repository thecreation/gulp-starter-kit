import fs from 'fs';
import config from '../../config';
import path from 'path';

module.exports.register = function (Handlebars) {
  Handlebars.registerHelper("svg", function(svg, options) {
    let filepath = path.join(config.assets.build, 'svgs', `${svg}.svg`);
    let result = fs.readFileSync(filepath, 'utf8');
    return new Handlebars.SafeString(result);
  });
};
