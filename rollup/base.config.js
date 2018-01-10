import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from '../package';
import config from '../config';
import path from 'path';
import Glob from 'glob-fs';

const glob = Glob();

const external = Object.keys(pkg.dependencies || {});

const globals = {};
external.forEach((plugin) => {
  switch (plugin) {
    case 'jquery':
      globals['jquery'] = 'jQuery';
      break;
    default:
      globals[plugin] = plugin;
  }
});

export default {
  input: glob.readdirSync(path.join(config.scripts.source, '**/*.js')),
  // external: external,
  // globals,
  output: {
    format: 'es',
  },
  plugins: [
    // Resolve libs in node_modules
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),

    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs({
      include: 'node_modules/**',
    }),
  ],

  sourcemap: false,
};
