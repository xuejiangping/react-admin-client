/* craco.config.js */
/* 该配置可暴露 react 的配置项，下面用来修改antd UI的主题颜色 */
const CracoLessPlugin = require('craco-less');
const path = require('path')
module.exports = {
  webpack: {
    alias: { '@': path.join(__dirname,'src') }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'green' },
            javascriptEnabled: true,
          }
        }
      }
    }
  ],
}