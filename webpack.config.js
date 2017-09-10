const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const webpack = require('webpack');
const ETP = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const Uglify = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const processCss = isProduction ? '?minimize!postcss-loader' : '';


module.exports = {
 //  https://webpack.js.org/configuration/devtool/
//   devtool: 'cheap-eval-source-map',
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
      },
      {
        test: /\.(css|scss|sass)$/,
        // loader: ETP.extract('style-loader', 'css-loader!sass-loader'),
        loader: ETP.extract({
          fallback: 'style-loader',
          use: `css-loader${processCss}!sass-loader`
        }),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        include: path.join(__dirname, 'src')
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    stats: 'errors-only',
    inline: true,
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    alias: {
      'styles': path.resolve(__dirname, 'src/styles'),
      'images': path.resolve(__dirname, 'src/assets')
    }
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
    
    new webpack.HotModuleReplacementPlugin(),

//    new webpack.optimize.CommonsChunkPlugin({
//      name: 'common'
//    }),
    
     new CommonsChunkPlugin({
      name: 'commons'
    }),
    
    // new Uglify(),

    // new ETP('styles.css'),
    new ETP({
      filename: '[name].styles.css',
      allChunks: true,
      disable: !isProduction
    }),
    
    new CleanWebpackPlugin(['dist'])
    
  ]
};