import React, { ReactElement } from 'react'
import { hot } from 'react-hot-loader/root'

import './app.less'

const App = (props, params) => {
  return <span className={'red'}>hello</span>
}

export default hot(App)
