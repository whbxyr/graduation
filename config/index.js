'use strict';

const path = require('path');

module.exports = {
  // 开发环境的具体配置
  dev: {
    env: require('./dev.env'),
    port: 3000,
    host: 'localhost',
    // 开发环境启动时是否自动打开浏览器
    autoOpenBrowser: true,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    // 开发环境用来做代理请求的
    proxyTable: {},
    /**
     * 大部分情况我们调试并不关心列信息，而且就算 sourcemap 没有列，有些浏览器引擎（例如 v8） 也会给出列信息，所以我们使用 cheap 模式可以大幅提高 souremap 生成的效率。
     * 使用 module 可支持 babel 这种预编译工具（在 webpack 里做为 loader 使用）。
     * 使用 eval 方式可大幅提高持续构建效率，参考 webapck devtool 文档 下方速度对比表格，这对经常需要边改边调的前端开发而言，非常重要！
     * eval-source-map 使用 DataUrl 本身包含完整 sourcemap 信息，并不需要像 sourceURL 那样，浏览器需要发送一个完整请求去获取 sourcemap 文件，这会略微提高点效率
     */
    devtool: 'cheap-module-eval-source-map',
    // 是否在浏览器上显示编译错误
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: true,
    cssSourceMap: true
  },
  // build时使用的配置
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    env: require('./prod.env'),
    // build出来的文件的目标文件夹
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 静态资源的放置位置
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
