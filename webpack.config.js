var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'app', 'app.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};