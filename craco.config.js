/* craco.config.js */
/* 该配置可暴露 react 的配置项，下面用来修改antd UI的主题颜色 */
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'gray' },
            javascriptEnabled: true,
          }
        }
      }
    }
  ],
}