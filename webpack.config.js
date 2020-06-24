const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
      rules: [ 
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: '/node_modules/'
        },
        {
          test: /\.(png|svg|jpe?g|gif|woff2|ttf|woff|otf)$/i,
          loader: 'file-loader'
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.css$/i,
          loader: [MiniCssExtractPlugin.loader, { loader: 'css-loader',  options: { importLoaders: 1 } }, 'postcss-loader'],
        },
        ]
    },
    plugins: [
      new HtmlWebpackPlugin(
        {template: './src/index.html'}
      ),
      new MiniCssExtractPlugin(),
    ]
};