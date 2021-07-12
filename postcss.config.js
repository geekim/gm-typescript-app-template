module.exports = {
  plugins: {
    // 修复一些和 flex 布局相关的 bug
    'postcss-flexbugs-fixes': {},
    // 参考 browserslist 的浏览器兼容表自动对那些还不支持的现代 CSS 特性做转换
    'postcss-preset-env': {
      // 自动添加浏览器头
      autoprefixer: {
        // will add prefixes only for final and IE versions of specification
        flexbox: 'no-2009'
      },
      stage: 3
    },
    // 根据 browserslist 自动导入需要的 normalize.css 内容
    'postcss-normalize': {},
    // px 转成 vw
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750.
      viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore'], //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名。
      minPixelValue: 0.5, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    }
  }
}
