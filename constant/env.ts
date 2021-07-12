'use strict'

import { resolve } from 'path'
import { argv } from 'yargs'

const PROJECT_NAME = 'react typescript demo'

const PROJECT_ROOT_PATH = resolve(__dirname, '../') // 项目根路径

const IS_DEV = process.env.NODE_ENV !== 'production' // 是否是开发环境

const IS_ANALYZE = !!argv.analyze // 是否打开分析页面

const DEFAULT_PORT = 4000 // 默认端口号

// 用于引入CDN添加到index.html
const CDN_JS = [
  '//fe-cdn.zuolin.com/react/17.0.1/umd/react.production.min.js',
  '//fe-cdn.zuolin.com/react-dom/17.0.1/umd/react-dom.production.min.js',
  '//fe-cdn.zuolin.com/react-router-dom/5.2.0/react-router-dom.min.js'
]

// webpack用于排除文件
const EXTERNALS = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM'
}

export {
  PROJECT_NAME,
  PROJECT_ROOT_PATH,
  IS_DEV,
  IS_ANALYZE,
  DEFAULT_PORT,
  EXTERNALS,
  CDN_JS
}
