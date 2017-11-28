const path = require('path');
const webpack = require('webpack');
// const WXAppWebpackPlugin = require('wxapp-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_PRODUCTION = 'production' === NODE_ENV;
const IS_BETA = 'beta' === NODE_ENV;
const IS_DEVELOPMENT = 'development' === NODE_ENV;

let webpackConfig = {
  entry: {
    app: [
      './src/app.js'
    ],
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    loaders: [{
        test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      }, {
        test: /\.(svg)$/,
        include: path.join(__dirname, 'src/images/'),
        exclude: /node_modules/,
        loader: 'url-loader?limit=16384&name=images/[hash].[ext]',
      }, {
        test: /\.(png|jpg|gif|icon|ico)$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'url-loader?limit=65536&name=images/[hash].[ext]',
      }, {
        test: /\.json$/,
        include: /src/,
        use: [{
          loader: 'file-loader',
          options: {
            useRelativePath: true,
            name: '[name].[ext]',
          },
        }],
      }, {
        test: /\.(js)$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      }, {
        test: /\.wxss$/,
        include: /src/,
        use: [{
            loader: 'file-loader',
            options: {
                useRelativePath: true,
                name: '[name].wxss',
            }
        }],
      }, {
        test: /\.wxml$/,
        include: path.resolve('src/pages'),
        use: [{
            loader: 'file-loader',
            options: {
                useRelativePath: true,
                name: '[name].[ext]',
            },
        }, {
            loader: 'wxml-loader',
            options: {
                root: path.resolve('src'),
                minimize: false,
            },
        }],
      }],
  },
  plugins: (() => {
    let webpackPlugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        'process.env.PLATFORM': JSON.stringify('weChat'),
      }),
    ];

    if (IS_PRODUCTION || IS_BETA) {
      webpackPlugins = [
        ...webpackPlugins,
        new CleanWebpackPlugin('./dist', {
          exclude: ['app.json'],
          verbose: true,
          dry: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          comments: false,
          compress: {
              warnings: false,
              drop_console: true,
              collapse_vars: true,
              reduce_vars: true,
          }
        }),
      ]
    }

    webpackPlugins = [
      ...webpackPlugins,
      // new WXAppWebpackPlugin(),
      new CopyWebpackPlugin([
        {from: 'src/app.json', to: path.join(__dirname, 'dist')}
      ]),
    ];

    return webpackPlugins;
  })(),
};

module.exports = webpackConfig;
