import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server';

import WebpackDevConfig from '../config/webpack.config.dev'

// 代理
import proxy from '../constant/proxy'

const DevServerOptions = {
  contentBase:'',
  hot:true,
  open:true,
  host:'localhost',
  port:3000,
  historyApiFallback:{
    disableDotRule:true,
  },
  line:true,
  stats:'errors-only',
  clientLogLevel:'none',
  proxy,
}

const complier = webpack(WebpackDevConfig);

const server = new WebpackDevServer(complier,DevServerOptions)


server.listen(DevServerOptions.port)