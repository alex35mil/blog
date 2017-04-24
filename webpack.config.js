const path = require('path');

module.exports = {
  entry: {
    app: [
      './app/styles/index.css',
      './lib/js/app/app.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-import')({ path: __dirname }),
                require('postcss-url'),
                require('postcss-hexrgba'),
                require('postcss-cssnext'),
              ],
            },
          },
        ],
      },
      {
        test: /\.woff2?$/,
        use: 'url-loader',
      },
    ],
  },
};
