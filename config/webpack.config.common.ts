import { BannerPlugin, Configuration } from 'webpack';
// BannerPlugin
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

import { appBuild, appHtml, appPublic } from '../constant/paths';
import { PROJECT_NAME, PROJECT_ROOT_PATH, IS_DEV } from '../constant/env';
import getCssLoaders from '../constant/get-css-loaders';
import HtmlMinifyOptions from '../constant/html-minify-Options';

const commonConfig: Configuration = {
  // context: resolve('./src/index.tsx'),
  output: {
    path: appBuild,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
  },
  externals: [],
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [...getCssLoaders(0)],
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(1),
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar({
      name: 'react-typescript-template',
      color: '#52c41a',
    }),
    new BannerPlugin({
      raw: true,
      banner: `/** @preserve Powered by abert */`,
    }),
    new CleanWebpackPlugin(),
    // 友好错误提示
    new FriendlyErrorsWebpackPlugin(),
    // 通知提醒
    new WebpackBuildNotifierPlugin({ suppressSuccess: true }),
    // 路径进行严格的大小写检查
    new CaseSensitivePathsWebpackPlugin(),
    // 循环依赖检查
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: PROJECT_ROOT_PATH,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      minify: IS_DEV ? false : HtmlMinifyOptions,
      hash: true,
      title: PROJECT_NAME,
      template: appHtml,
      filename: 'index.html',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          context: appPublic,
          from: '*',
          to: appBuild,
          toType: 'dir',
          globOptions: {
            ignore: ['index.html'],
          },
        },
      ],
    }),
    // TODO 存在问题，二次打包报错
    new HardSourceWebpackPlugin({ info: { mode: 'none', level: 'warn' } }),
  ],
};

export default commonConfig;
