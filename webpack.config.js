var path = require('path');

module.exports = {
  entry: {
    js: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
