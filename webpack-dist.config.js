var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './app/app.js',
    about: './about/about.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include:  path.join(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      hash: true,
      chunks: ['commons', 'app']
      //excludehunks: []
    }),
    
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      hash: true,
      chunks: ['commons', 'about'],
      filename: 'about.html' 
    }),
    
    new CommonsChunkPlugin({
      name: 'commons'
    })
    
  ]
};