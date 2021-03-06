module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            {
              prefixIds: true,
            },
          ],
        },
      });
  },
  css: {
    modules: true,
    loaderOptions: {
      sass: {
        data: `
          @import "~@/styles/main";
        `,
      },
    },
  },
  productionSourceMap: false,
  devServer: {
    port: 8000,
  },
};
