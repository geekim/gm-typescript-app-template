// import fs from 'fs'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
// import inquirer from 'inquirer'

import devConfig from '../config/webpack.config.dev'
import { appBuild } from '../constant/paths'
import { DEFAULT_PORT, DEFAULT_HOST } from '../constant/env'
import proxy from '../constant/proxy' // 代理

// const cachedPath = './scripts/.cached'
// let cachedProxySetting
// try {
//   cachedProxySetting = fs.readFileSync(cachedPath, 'utf8')
// } catch (err) {
//   cachedProxySetting = 'http://opv2-beta.zuolin.com'
// }

const DevServerOptions: WebpackDevServer.Configuration = {
  contentBase: appBuild,
  hot: true,
  open: true,
  host: DEFAULT_HOST,
  port: DEFAULT_PORT,
  historyApiFallback: {
    disableDotRule: true
  },
  inline: true,
  stats: 'errors-only',
  clientLogLevel: 'none',
  proxy
}

// inquirer
//   .prompt([
//     {
//       type: 'input',
//       name: 'proxy',
//       message: '需要代理的服务器地址？',
//       default: cachedProxySetting,
//       validate(value: string) {
//         const pass = value.match(/^https?:\/\/+./i)
//         if (pass) {
//           return true
//         }
//         return '服务器地址格式错误'
//       }
//     }
//   ])
//   // eslint-disable-next-line promise/always-return
//   .then((answers: any) => {
//     fs.writeFileSync(cachedPath, answers.proxy)
//   })
//   .catch((error: any) => {
//     console.log(error)
//   })

const complier = webpack(devConfig)
const server = new WebpackDevServer(complier, DevServerOptions)
server.listen(DEFAULT_PORT)
