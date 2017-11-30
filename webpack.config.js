const path = require('path');
const WXAppWebpackPlugin = require('wxapp-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
 // 引入 `app.js`
 entry: './src/app.js',
 output: {
   filename: '[name].js',
   // 此处 `dist` 为微信开发者工具引入的开发目录
   path: path.resolve(__dirname, 'dist'),
 },
 plugins: [
   new WXAppWebpackPlugin(),
 ],
 module: {
   loaders: [{
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
    }],
 },
 resolve: {
   modules: ['src', 'node_modules'],
   extensions: ['.js'],
 },
};
