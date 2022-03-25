const path = require('path');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/, // a reg exp to look for .ts
        use: 'ts-loader',
        exclude: [/node_modules/, /_section2/]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};