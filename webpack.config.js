const path = require('path');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            reduce_funcs: true,
            reduce_vars: true,
            booleans_as_integers: true
          },
          mangle: true,
          output: {
            comments: false 
          },
        },
      }),],
    },
  };
};
