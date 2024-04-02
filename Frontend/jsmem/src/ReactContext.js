import React from 'react'

const ReactContext = React.createContext({
  isLogin: 'false',
  changeLoginStatus: () => {},
})

export default ReactContext