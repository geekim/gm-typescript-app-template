import { resolve } from "path";
import process from 'process'
import { BannerPlugin, Configuration, RuleSetUseItem } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const ROOT_PATH = resolve(__dirname, "../");
const PROJECT_NAME = 'react-webpack-ts 模板';
const IS_DEV = process.env.NODE_ENV !== 'production';


const commonConfig: Configuration = {
  context: resolve(ROOT_PATH),
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].[hash].bundle.js",
  },
  // 配置模块如何解析
  resolve: {
    // 自动解析确定的扩展
    extensions: [".ts", ".tsx", ".js", ".json"],
    // 别名
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },

  module: {
    // 解析模块需要的解析器
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: "babel-loader",
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        exclude: [
          /\.html$/,
          /\.md$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.less$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.svg$/,
        ],
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: "url-loader",
        options: {
          limit: 10000,
          fallback: require("file-loader"),
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      minify: IS_DEV
        ? false
        : {
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
      title: PROJECT_NAME,
      hash: true,
      template: resolve(ROOT_PATH, "public", "index.html"),
      cdn: {
        js: IS_DEV
            ? []
            : [
                'https://cdn.bootcss.com/react/16.13.1/umd/react.production.min.js',
                'https://cdn.bootcss.com/react-dom/16.13.1/umd/react-dom.production.min.js',
            ],
      },
    }),
  ],
};

export default commonConfig;
