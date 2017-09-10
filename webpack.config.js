var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const webpack = require('webpack')

module.exports = {
 //  https://webpack.js.org/configuration/devtool/
   devtool: 'cheap-eval-source-map',
 //  devtool: 'cheap-module-source-map', 
  context: path.join(__dirname, 'src'),
  entry: {
    home: './app/home.js',
    post: './app/post.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    stats: 'errors-only'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      hash: true,
      chunks: ['commons', 'home']
      //excludehunks: []
    }),
    
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      hash: true,
      chunks: ['commons', 'post'],
      filename: 'post.html' 
    }),
    
    new CommonsChunkPlugin({
      name: 'commons'
    })
    
  ]
};