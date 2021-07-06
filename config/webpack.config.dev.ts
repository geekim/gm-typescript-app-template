import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import commonConfig from './webpack.config.common';
import {appTsConfig} from '../constant/paths'

const devConfig: Configuration = {
  mode: 'development',
  entry: [],
  devtool: 'source-map',
  module: {
    rules: [{ enforce: 'pre', test: '/.js$/', loader: 'source-map-loader' }],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      memoryLimit: 1024,
      // babel 转换的是我们前端代码，所以是指向前端代码的 tsconfig.json
      tsconfig: appTsConfig,
    }),
    new HotModuleReplacementPlugin(),
  ],
};

export default merge(devConfig, commonConfig);
