var path = require('path');

module.exports = {
  entry: {
    'index': './modules/index.ts',
    'paginate-pipe': './modules/paginate-pipe.ts',
    'pagination-controls-cmp': './modules/pagination-controls-cmp.ts',
    'pagination-service': './modules/pagination-service.ts'
  },
  output: {
    // We use CommonJS because of Meteor 1.3 specification that uses it
    libraryTarget: 'commonjs',
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  externals: [
    {
      // Angular files from the source code will be available from the NPM package
      // No need to bundle them inside
      './paginate-pipe': './paginate-pipe',
      './pagination-controls-cmp': './pagination-controls-cmp',
      './pagination-service': './pagination-service',
      'angular2/core': 'angular2/core',
      'angular2/common': 'angular2/common',
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
      {test: /\.tsx?$/, loader: 'ts-loader'}
    ]
  }
};