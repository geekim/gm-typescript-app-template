import webpack, { Stats } from 'webpack'

import proConfig from '../config/webpack.config.prod'

// eslint-disable-next-line no-console
console.log('Creating an optimized production build ...')

const complier = webpack(proConfig)

complier.run((err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  const option: Stats.ToStringOptions = {
    modules: true,
    colors: true,
    timings: true
  }
  const statsMes = stats.toJson(option)

  // eslint-disable-next-line no-console
  console.log('打包使用时间：', statsMes.time)

  // eslint-disable-next-line no-console
  console.info(stats.toString(option))
})
