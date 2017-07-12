# Gulp - Metalsmith - Starter

> A starter template for Metalsmith, Gulp, ECMAScript(latest), webpack3, sass and postcss.

## Features
This starter also features a number of great software (in the words of their creators):
- [Lanyon](http://lanyon.getpoole.com/) - a content-first, sliding sidebar theme (originally) for Jekyll (by [mdo](http://mdo.fm))
- [Gulp](http://gulpjs.com/) - a task automation tool
- [Browsersync](https://www.browsersync.io/) - time-saving synchronised browser testing (once you go live-reload, you'll never come back)
- [Sass](http://sass-lang.com/) - CSS with superpowers
- [PostCSS](https://github.com/postcss/postcss) - a tool for transforming styles with JS plugins
- [Autoprefixer](https://github.com/postcss/autoprefixer) - adding vendor prefixes by the rules of [Can I Use](http://caniuse.com/)
- [Webpack](https://webpack.github.io/) - a bundler for javascript and friends
- [handlebars](https://github.com/wycats/handlebars.js) - a javascript template engine.
- [handlebars-layouts](https://github.com/shannonmoeller/handlebars-layouts) - a handlebars helpers which implement layout blocks.
- [svgo](https://github.com/svg/svgo) - a Nodejs-based tool for optimizing SVG vector graphics files.
- [Favicons](https://github.com/evilebottnawi/favicons) - a Node.js module for generating favicons and their associated files. 
- [EditorConfig](http://editorconfig.org/)
- [imagemin](https://github.com/imagemin/imagemin) - a Node.js module for minify images seamlessly

## Lint
- [ESLint](http://eslint.org/) - the pluggable linting utility for JavaScript and JSX (with preconfigured ruleset by [Google](https://github.com/google/eslint-config-google))
- [Stylelint](http://stylelint.io/) - a mighty, modern CSS linter (with preconfigured ruleset by [Hugo Giraudel](https://sass-guidelin.es/))

## Metalsmith plugins
- [metalsmith-drafts](https://github.com/segmentio/metalsmith-drafts) - A metalsmith plugin to hide drafts.
- [metalsmith-data](https://github.com/elcontraption/metalsmith-data) - a metalsmith plugin to add namespaced global data objects from files.
- [metalsmith-metallic](https://github.com/weswigham/metalsmith-metallic) - a metalsmith plugin to highlight code in Markdown files.
- [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown) - a metalsmith plugin to convert markdown files.
- [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts) - a metalsmith plugin for layouts.
- [metalsmith-in-place](https://github.com/superwolff/metalsmith-in-place) - a metalsmith plugin for in-place templating.
- [metalsmith-html-minifier](https://github.com/whymarrh/metalsmith-html-minifier) - a metalsmith plug-in to minify HTML files.
- [metalsmith-collections](https://github.com/segmentio/metalsmith-collections) - a metalsmith plugin that groups files together into collections.
- [metalsmith-register-helpers](https://github.com/losttype/metalsmith-register-helpers) -  a Metalsmith plugin for registering Handlebars helpers.
- [metalsmith-rootpath](https://github.com/amazingsurge/metalsmith-rootpath) - a Metalsmith plugin for add relative path to the root directory.

## Webpack plugins
- [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)
- [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)
- [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)
- [NoEmitOnErrorsPlugin](https://webpack.js.org/plugins/no-emit-on-errors-plugin/)
- [LoaderOptionsPlugin](https://webpack.js.org/plugins/loader-options-plugin/)
- [UglifyJsPlugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/)

## Getting started
Make sure [Node.js](http://nodejs.org/) is installed on your system, then clone this repository and install its dependencies via [NPM](https://npmjs.org/):

1. Clone gulp-metalsmith-starter

   ```
   $ git clone https://github.com/amazingsurge/metalsmith-gulp-boilerplate.git new-metalsmith-project
   ```

2. Run the following command within your new project directory:

   ```
   $ npm install
   ```

3. Assuming you have [installed Gulp globally](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#1-install-gulp-globally) and [installed Babel globally](https://babeljs.io/docs/usage/cli/#installation),
start the build/watch process with this command:

   ```
   $ gulp
   ```

## List of Gulp tasks

To run separate task type in command line `gulp [task_name]`.
Almost all tasks also have watch mode - `gulp watch:[task_name]`, but you don't need to use it directly.

### Main tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files, run server with livereload
`build`            | builds all content and assets from `src` to `dist`.

### Other tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`styles`           | compile .scss to .css. 
`scripts`          | compile .js sources into bundle file
`copy`             | copy files from `src/assets` path to `dist/assets` path
`html`             | compile .hbs to .html
`svgs`             | optimize svg files
`fonts`            | copy files from `src/fonts` path to `dist/fonts` path
`prettier`         | prettify js files
`server`           | start a BrowserSync instance.
`clean`            | remove `dist` folder
`favicons`         | generate favicons to `dist/assets/favicons` path
`images`           | optimize and copies images in `./src/images` to `dist/assets/images`
`watch`            | watchs for changes in `src/` path and rebuilds parts of the site as necessary

All available tasks are placed in a folder `tasks`. 

## Flags
* `gulp [task_name] --prod` or `gulp [task_name] --production` - run task in production mode.

### Workflow
Everything's ready to get started right away:

`npm start` - Compiles assets & html, launches development server:
- compiles styles & scripts are being compiled & concatenated
- compresses images
- builds the site & opens it in your default browser
- watches for changes and injects them right away

`npm run build` - Same as above, but in production mode:
- compiles & builds everything
- minifies & compresses everything

`npm run deploy` - Same as above, plus everything's being pushed to your repositories' `gh-pages` branch

### Configuration
Global variables and site metadata can be found inside `config.js`. Metalsmith's build process resides in `metalsmith.js`. Static assets such as (S)CSS or JS files as well as fonts and images are located inside `src`, pages in their respective folders inside `src/html`. If something doesn't suit your needs, just make it so, and if you stumble across something worth sharing, then think about ..

## Structure

```bash
├── README.md               # Important information related
├── package.json            # The node.js modules dependencies file
├── .gitignore              # Git ignore rules
├── webpack.config.js       # Controls javascript bundling
├── gulpfile.babel.js       # The Gulp task manager configuration
├── tasks/                  # Gulp tasks definations
├── dist/                   # Gulp builds the static site into this directory
└── src/                    # The source code of the application
    ├── assets/             # Assets files copy to dist
    ├── data/               # Metadata associated with the site.
    ├── styles/             # Stylesheets
    ├── scripts/            # Javascript scripts
    ├── fonts/              # Font files
    ├── images/             # Images files
    ├── svgs                # SVGs
    ├── favicons            # Favicon image
    ├── layouts/            # Handlebars HTML layouts that are based on.
    ├── partials/           # Handlebars HTML partials that are included / extended
    └── html/               # Handlebars HTML files, one per page on the site.
```

### Credit
- [Gulp v4 - Metalsmith - Starter](https://github.com/S1SYPHOS/Gulp4-Metalsmith-Starter)
