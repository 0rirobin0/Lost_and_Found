// All variable  and function as state 
// are intiated here those are sharable among pages


import React, { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {


  //Dark mode var function

  const [mode, setMode] = useState("light");


  const textclr = mode == 'dark' ? 'light' : 'dark';

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');

    } else {
      setMode('light');

    }
  };
  document.body.style.backgroundColor = mode == 'dark' ? '#121212' : 'white';


  // Alert var,function

  const [alert, setalert] = useState(null);

  const showAlert = (type, msg) => {
    setalert(
      {
        msg: msg,
        type: type
      }


    )

    setTimeout(() => {
      setalert(null);
    }, 3000);
  }


  // Auth Token

  const [authtoken, Setauthtoken] = useState(null);

  const [prevpath, Setprevpath] = useState('/');






  return (
    <GlobalStateContext.Provider
      value={{
        textclr,
        mode, toggleMode,
        alert, showAlert,
        authtoken, Setauthtoken,
        prevpath,Setprevpath,


      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
