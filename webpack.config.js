var path = require('path');

module.exports = {
  entry: './modules/ng2-pagination.ts',
  output: {
    // We use CommonJS because of Meteor 1.3 specification that uses it
    libraryTarget: 'commonjs',
    path: path.join(__dirname, "build"),
    filename: "index.js"
  },
  externals: [
    {
      // Angular files from the source code will be available from the NPM package
      // No need to bundle them inside
      'angular2/core': 'angular2/core',
      'rxjs/Rx': 'rxjs/Rx'
    }
  ],
  resolve: {
    root: __dirname,
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.less', '.html']
  },
  node: {
    process: false
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'ts-loader'},
      {test: /\.html$/, loader: 'html-loader'}
    ]
  }
};