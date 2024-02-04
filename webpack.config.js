const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = ( argv) => {
  return {
    mode: argv.mode || 'development', // Default to 'development' if mode is not provided
    entry: './public/js/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public/dist'),
      publicPath: '/public/' // Set your public path
    },
    plugins: [
      new Dotenv()
    ]
  };
};
