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
      
    } else {
      setMode('light');
     
    }
  };
  document.body.style.backgroundColor = mode=='dark' ? '#121212' :'white';










  return (
    <GlobalStateContext.Provider value={{ mode, toggleMode }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
