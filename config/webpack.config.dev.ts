import { Configuration, HotModuleReplacementPlugin } from 'webpack'
import { merge } from 'webpack-merge'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin'

import commonConfig from './webpack.config.common'
import { appTsConfig, appSrcIndex } from '../constant/paths'

const devConfig: Configuration = {
  mode: 'development',
  entry: ['react-hot-loader/patch', appSrcIndex],
  devtool: 'source-map',
  module: {
    rules: [{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }]
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 1024,
        configFile: appTsConfig
      }
    }),
    new HotModuleReplacementPlugin()
  ]
}

export default merge(devConfig, commonConfig)
