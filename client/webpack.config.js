const path = require('path');

module.exports = {
  entry: './crowdspeak.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'crowdspeak.min.js', // Output file name
  },
  mode: 'production', // Mode set to 'production' for minification
};
