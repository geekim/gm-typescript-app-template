import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import devConfig from '../config/webpack.config.dev'
import { appBuild } from '../constant/paths'
import { DEFAULT_PORT } from '../constant/env'
// 代理
import proxy from '../constant/proxy'

const DevServerOptions: WebpackDevServer.Configuration = {
  contentBase: appBuild,
  hot: true,
  open: true,
  host: 'localhost',
  port: DEFAULT_PORT,
  historyApiFallback: {
    disableDotRule: true
  },
  inline: true,
  stats: 'errors-only',
  clientLogLevel: 'none',
  proxy
}

const complier = webpack(devConfig)

const server = new WebpackDevServer(complier, DevServerOptions)

server.listen(DEFAULT_PORT)
