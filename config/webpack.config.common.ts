import { BannerPlugin, Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackBar from 'webpackbar'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'

import { appBuild, appHtml, appPublic, appContext } from '../constant/paths'
import {
  PROJECT_NAME,
  PROJECT_ROOT_PATH,
  IS_DEV,
  CDN_JS
} from '../constant/env'
import getCssLoaders from '../constant/get-css-loaders'
import HtmlMinifyOptions from '../constant/html-minify-Options'

const commonConfig: Configuration = {
  context: appContext,
  output: {
    path: appBuild,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [...getCssLoaders(0)]
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(1),
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              // 图片低于 10k 会被转换成 base64 格式的 dataUrl
              limit: 10 * 1024,
              // [hash] 占位符和 [contenthash] 是相同的含义
              // 都是表示文件内容的 hash 值，默认是使用 md5 hash 算法
              name: '[name].[contenthash:8].[ext]',
              // 保存到 images 文件夹下面
              outputPath: 'static/images/'
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[contenthash:8].[ext]',
              outputPath: 'static/fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackBar({
      name: 'react-typescript-template',
      color: '#52c41a'
    }),
    new BannerPlugin({
      raw: true,
      banner: `/** @preserve Powered by abert */`
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
      cwd: PROJECT_ROOT_PATH
    }),
    new HtmlWebpackPlugin({
      inject: true,
      minify: IS_DEV ? false : HtmlMinifyOptions,
      hash: true,
      title: PROJECT_NAME,
      template: appHtml,
      filename: 'index.html',
      cdn: {
        js: IS_DEV ? [] : CDN_JS
      }
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          context: appPublic,
          from: '*',
          to: appBuild,
          toType: 'dir',
          globOptions: {
            ignore: ['index.html']
          }
        }
      ]
    }),
    new HardSourceWebpackPlugin({ info: { mode: 'none', level: 'warn' } })
  ]
}

export default commonConfig
