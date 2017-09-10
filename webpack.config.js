const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: {
      app: [
        './src/js/main.js',
        './src/scss/styles.scss'
      ]
  },
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: './images/[name].[ext]',
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('./css/[name].css'),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, 'templates/views/**/*.twig')),
    //   minimize: inProduction
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction
    })
  ]
};

(inProduction)
  ? module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin())
  : null;
