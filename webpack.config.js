const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
   resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  watch:true,
  watchOptions: {
  aggregateTimeout: 300,
  poll: 1000
  }
};
