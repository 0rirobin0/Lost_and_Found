// All variable  and function as state 
// are intiated here those are sharable among pages


import React, { createContext, useState } from 'react';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
 
 
  //Dark mode var function
    const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#121212';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };








  return (
    <GlobalStateContext.Provider value={{ mode, toggleMode }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
