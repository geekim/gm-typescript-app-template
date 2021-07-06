'use strict';

import { resolve } from 'path'
const PROJECT_NAME = 'react typescript demo';

const PROJECT_ROOT_PATH = resolve(__dirname, '../')   // 项目根路径

const IS_DEV = process.env.NODE_ENV !== 'production'  // 是否是开发环境

export {
  PROJECT_NAME,
  PROJECT_ROOT_PATH,
  IS_DEV
}