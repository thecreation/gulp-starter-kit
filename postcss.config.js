// See: https://github.com/postcss/postcss-loader#usage

module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        // For more browsers, see https://github.com/ai/browserslist
        '> 1%',
        'last 3 versions',
        'IE >= 9'
      ]
    })
  ]
};
