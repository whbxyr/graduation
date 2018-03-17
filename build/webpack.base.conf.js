'use strict'
const path = require('path')
const config = require('../config')
const utils = require('./utils')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve('..'),
  entry: {
    app: './src/app.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name]-[hash].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolve('./src')],
        options: {
          // 这会将转译的结果缓存到文件系统中，将 babel-loader 提速至少两倍
          cacheDirectory: true
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL
        loader: 'url-loader',
        options: {
          // 8192 bytes === 8KB
          limit: 8192,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
