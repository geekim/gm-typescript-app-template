import webpackMerge from 'webpack-merge'
import { Configuration } from 'webpack'
import { resolve } from 'path'
const PROJECT_ROOT = resolve(__dirname, "../");

const prodConfig: Configuration = {
	mode: "production",
	devtool: 'source-map',
  entry: resolve(PROJECT_ROOT, 'src', 'index.tsx'),

}

