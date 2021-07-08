'use strict'

import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin'

import { IS_DEV } from './env'

const getCssLoaders = (importLoaders: number) => {
  return [
    IS_DEV ? 'style-loader' : MiniCssExtractLoader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: true,
        importLoaders
      }
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: true }
    }
  ]
}

export default getCssLoaders
