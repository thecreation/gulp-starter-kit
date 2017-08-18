import config from '../config';
import rollupBase from './base.config';
import extend from 'deepmerge';

module.exports = extend(rollupBase, {
  plugins: [],
});
