module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "./js/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};
