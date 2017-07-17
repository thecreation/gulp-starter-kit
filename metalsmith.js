import collections from 'metalsmith-collections';
import inplace from 'metalsmith-in-place';
import layouts from 'metalsmith-layouts';
import markdown from 'metalsmith-markdown';
import data from 'metalsmith-data';
import metallic from 'metalsmith-metallic';
import Metalsmith from 'metalsmith';
import handlebars from 'handlebars';
import handlebarsLayouts from 'handlebars-layouts';
import permalinks from 'metalsmith-permalinks';
import helpers from 'metalsmith-register-helpers';
import beautify from 'metalsmith-beautify';
import drafts from 'metalsmith-drafts';
import glob from 'glob';
import rootPath from 'metalsmith-rootpath';
import config from './config';

handlebars.registerHelper(handlebarsLayouts(handlebars));

export default function(callback, clean) {
  const metalsmith = new Metalsmith(__dirname);

  metalsmith.metadata(config.html.metadata);
  metalsmith.source(config.html.source);
  metalsmith.destination(config.html.build);
  metalsmith.clean(false);
  metalsmith.use(drafts());
  metalsmith.use(
    helpers({
      directory: 'src/helpers'
    })
  );
  metalsmith.use(
    data({
      site: 'src/data/site.yml',
      links: 'src/data/links.yml'
    })
  );
  metalsmith.use(
    collections({
      pages: 'pages/*.md'
    })
  );
  metalsmith.use(metallic());
  metalsmith.use(
    markdown({
      smartypants: true,
      gfm: true,
      tables: true,
      langPrefix: 'language-'
    })
  );
  metalsmith.use(
    permalinks({
      pattern: ':title',
      linksets: [
        {
          match: { collection: 'pages' },
          pattern: 'pages/:title'
        }
      ]
    })
  );
  metalsmith.use(rootPath());
  metalsmith.use(
    inplace({
      // Render handlebars content pages
      engineOptions: {
        partials: './partials/'
      },
      pattern: '**/*.{hbs,md,html}'
    })
  );
  metalsmith.use(
    layouts({
      engine: 'handlebars',
      rename: true,
      directory: './src/layouts',
      default: 'default.hbs',
      pattern: '**/*.{hbs,md,html}',
      partials: './src/partials',
      partialExtension: '.hbs'
    })
  );
  metalsmith.use(
    beautify({
      js: false,
      preserve_newlines: false,
      html: true
    })
  );
  return metalsmith.build(callback);
}
