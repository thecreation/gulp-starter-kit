import config from '../config';
import rollupBase from './base.config';
import uglify from 'rollup-plugin-uglify';
import extend from 'deepmerge';

module.exports = extend(rollupBase, {
  plugins: [
    uglify()
  ]
});
