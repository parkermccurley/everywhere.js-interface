import path from 'path';

export default {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  debug: true,
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
