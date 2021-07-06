import { BannerPlugin, Configuration, RuleSetUseItem } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier'
// import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import CaseSensitivePathsWebpackPlugin from 'case-sensitive-paths-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin';

import { appBuild, appHtml, appPublic } from '../constant/paths';
import { PROJECT_NAME, PROJECT_ROOT_PATH } from '../constant/env';
import getCssLoaders from '../constant/get-css-loaders';

const commonConfig: Configuration = {
  // context: resolve('./src/index.tsx'),
  output: {
    path: appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
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
    new CleanWebpackPlugin(),
    // new FriendlyErrorsWebpackPlugin(),
    new WebpackBuildNotifierPlugin({ suppressSuccess: true }),
    new CaseSensitivePathsWebpackPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: PROJECT_ROOT_PATH,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      minify: false,
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
  ],
};

export default commonConfig;
