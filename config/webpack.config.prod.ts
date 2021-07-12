import { Configuration, HashedModuleIdsPlugin } from 'webpack'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import SpeedMeasureWebpackPlugin from 'speed-measure-webpack-plugin'
import compressionWebpackPlugin from 'compression-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
// import WebpackMerge from 'webpack-merge';
import { merge } from 'webpack-merge'
import SizePlugin from 'size-plugin'

import commonConfig from './webpack.config.common'
import { IS_ANALYZE, EXTERNALS } from '../constant/env'
import { appSrcIndex, appTsConfig } from '../constant/paths'

const prodConfig: Configuration = {
  mode: 'production',
  entry: appSrcIndex,
  externals: EXTERNALS,
  optimization: {
    // 使用 minimizer 而不是默认的 uglifyJS
    minimize: true,
    // 两个 minimizer：TerserPlugin 和 OptimizeCSSAssetsPlugin
    minimizer: [
      new TerserWebpackPlugin({ extractComments: false }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 1024 * 2,
        configFile: appTsConfig
      }
    }),
    new MiniCssExtractPlugin({
      // 文件名中插入文件内容的 hash 值
      filename: '/static/css/[name].[contenthash].css',
      chunkFilename: '/static/css/[id].[contenthash].css',
      ignoreOrder: false
    }),
    // 各个文件的gzip 压缩版
    new compressionWebpackPlugin({ cache: true }),
    // 不输出文件大小到磁盘
    new SizePlugin({ writeFile: false })
  ]
}

const mergeConfig = merge(prodConfig, commonConfig)

if (IS_ANALYZE) {
  mergeConfig.plugins!.push(new BundleAnalyzerPlugin())
}

const smp = new SpeedMeasureWebpackPlugin()

export default smp.wrap(mergeConfig)
