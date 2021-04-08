import webpackMerge from "webpack-merge";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import { resolve } from "path";
import commonConfig from './webpack.config.common.ts'
const ROOT_PATH = resolve(__dirname, "../");

const devConfig: Configuration = {
  mode: "development",
  entry: resolve(ROOT_PATH, "src", "index.tsx"),
  entry: ["react-hot-loader/patch", resolve(ROOT_PATH, "src", "index.tsx")],
  module: {
    rules: [{ test: /\.js$/, enforce: "pre", loader: "source-map-loader" }],
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({ memoryLimit: 1024, tsconfig: resolve(ROOT_PATH, 'tsconfig.json') }),
    // new ErrorOverlayWebpackPlugin(),
    new HotModuleReplacementPlugin(),
  ],
  devtool: "source-map",
};


export default webpackMerge(commonConfig,devConfig);
