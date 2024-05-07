// ReactContext.js
import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie'

const Context = createContext();

const ReactContext = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const changeLoginStatus = () => {
    const token = Cookies.get("jwt_token2");
    setIsLogin(token ? true : false);
  };

  return (
    <Context.Provider value={{ isLogin, changeLoginStatus }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ReactContext };

// import React from 'react'

// const ReactContext = React.createContext({
//   isLogin: 'false',
//   changeLoginStatus: () => {},
// })

// export default ReactContext