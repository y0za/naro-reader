const webpack = require('webpack');

const proxyUrl = process.env.PROXY_URL;
const naroUrl = 'https://ncode.syosetu.com/';
const naroProxyUrl = (proxyUrl != null) ? (proxyUrl + naroUrl) : '/naro_proxy/';

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        NARO_BASE_URL: JSON.stringify(naroProxyUrl)
      })
    ]
  },
  devServer: {
    proxy: {
      '/naro_proxy': {
        target: naroUrl,
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
