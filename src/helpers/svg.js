import fs from 'fs';
import config from '../../config';
import path from 'path';
import Handlebars from 'handlebars';

module.exports = function(svg) {
  let filepath = path.join(config.assets.build, 'svgs', `${svg}.svg`);
  let result = fs.readFileSync(filepath, 'utf8');
  return new Handlebars.SafeString(result);
};
