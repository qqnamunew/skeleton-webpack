var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 //  https://webpack.js.org/configuration/devtool/
   devtool: 'cheap-eval-source-map',
 //  devtool: 'cheap-module-source-map', 
  context: path.join(__dirname, 'src'),
  entry: {
    app: './app/app.js',
    about: './about/about.js',
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
      chunks: ['app']
      //excludehunks: []
    }),
    
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      hash: true,
      chunks: ['about'],
      filename: 'about.html'
    }),
    
  ]
};