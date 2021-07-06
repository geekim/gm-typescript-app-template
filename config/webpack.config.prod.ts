import { Configuration, HotModuleReplacementPlugin } from 'webpack';
// import WebpackMerge from 'webpack-merge';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.config.common';

const prodConfig: Configuration = {
  mode: 'production',
  entry: [],
  devtool: '',
};

export default merge(prodConfig, commonConfig);
