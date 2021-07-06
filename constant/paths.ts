'use strict'

import { resolve } from 'path'
// import fs from 'fs'
import { PROJECT_ROOT_PATH } from './env'

// const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath: string) : string => resolve(PROJECT_ROOT_PATH,relativePath)

const appBuild = resolveApp('./build');

const appHtml = resolveApp('./public/index.html');

const appPublic= resolveApp('./public');

const appTsConfig = resolveApp('tsconfig.json')

export { 
  appBuild,
  appHtml,
  appPublic,
  appTsConfig
}