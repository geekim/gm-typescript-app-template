'use strict';

// 代理转发
const proxy = {
  '/api': {
    target:'http://bizdev1.zuolin.com',
  }
}

export default proxy