const BootstrapVueLoader = require("bootstrap-vue-loader");
module.exports = {
  publicPath: process.env.PUBLIC_URL || "/",
  configureWebpack: {
    plugins: [new BootstrapVueLoader()]
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      });
  },
  devServer: {
    proxy: "http://localhost:8088/"
  }
};
