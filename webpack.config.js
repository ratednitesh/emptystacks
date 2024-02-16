const path = require('path');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (argv) => {
  return {
    mode: argv.mode || 'development',
    entry: './public/js/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: './',
      clean: true
    },
    plugins: [
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      // Generate index.html
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: 'body',
      scriptLoading: 'blocking' 

      }),
      // Generate other HTML files under public/pages
      ...generateHtmlPlugins('./public/pages/'),
      // Copy images from public/images to dist/images
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/images', to: 'images' } // Copy images from public/images to dist/images
        ],
        options: {
          concurrency: 100,
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'public/css'),
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              // drop_console:true,
              reduce_funcs: true,
              reduce_vars: true,
            },
            mangle: true,
            output: {
              comments: false,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
    },
  };
};

// Function to generate HtmlWebpackPlugin instances for each HTML file in the specified directory
function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(templateDir);
  return templateFiles.map(file => {
    const parts = file.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: path.join('pages', `${name}.html`), // Output HTML files under dist/pages
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false
    });
  });
}
