import React, { useContext } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar';
import Category from './components/Category';
import Footer from './components/Footer';
import { ModeContext } from './components/Mode';


function App() {
  
  const { mode, toggleMode } = useContext(ModeContext);

  return (
    <>
     <Navbar mode={mode} toggleMode={toggleMode}/>
     <Searchbar/>
     <Category mode={mode}/>
     <Footer/>
  
    </>
  )
}

export default App
