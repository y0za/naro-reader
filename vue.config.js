const webpack = require('webpack');

const publicProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const naroRealUrl = 'https://ncode.syosetu.com';
const naroBaseUrl = publicProxyUrl + naroRealUrl;

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        NARO_BASE_URL: process.env.NODE_ENV === 'production' ? naroBaseUrl : '/naro_proxy/'
      })
    ]
  },
  devServer: {
    proxy: {
      '/naro_proxy': {
        target: naroRealUrl,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/naro_proxy': ''
        },
        onProxyRes(proxyRes, req, res) {
          proxyRes.headers['Access-Control-Allow-Origin'] = '*'
        }
      }
    }
  }
}
