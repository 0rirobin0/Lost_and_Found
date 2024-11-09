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

  // prev path store
  const [prevpath, Setprevpath] = useState('/');


  // Search keyword
  const [search,Setsearch]=useState('');

  //Total claims state and update function
  const [totalClaims,setTotalClaims]=useState(0);

  const updateClaimsCount=(newCount)=>{
    setTotalClaims(newCount);
  };

  //Total Founds state and update function
  const [totalFounds,setTotalFounds]=useState(0);

  const updateFoundsCount=(newCount)=>{
    setTotalFounds(newCount);
  }

  //Initialize the user state
  const [user,setUser]=useState(null);

  //update the userState when someone logging in
  const loginUser=(userData)=>{
    setUser(userData);
  }

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/api/logout`, { withCredentials: true });
      // Proceed with clearing state and redirecting to login as in the previous example
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  const [categoryFilter, setCategoryFilter] = useState("");  

  return (
    <GlobalStateContext.Provider
      value={{
        textclr,
        mode, toggleMode,
        alert, showAlert,
        authtoken, Setauthtoken,
        loginUser,
        prevpath,Setprevpath,
        search,Setsearch,
        totalClaims,updateClaimsCount,
        totalFounds,updateFoundsCount,
        user,setUser,
        categoryFilter, setCategoryFilter
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
