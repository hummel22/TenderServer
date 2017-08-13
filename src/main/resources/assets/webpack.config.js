var path = require('path');

// ...



module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "./js/bundle.js"
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), './node_modules']
  },
  devServer: {
  contentBase: './'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};
