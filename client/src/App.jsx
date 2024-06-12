import React, { useContext } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar';
import Category from './components/Category';
import Footer from './components/Footer';
import { GlobalStateContext } from './components/GlobalState';


function App() {
  const {textclr} = useContext(GlobalStateContext);
 
  
  return (
    <>
     <Navbar/>

     <Searchbar/>
      <h3 className={'d-flex justify-content-center text-'+textclr}> খুঁজুন আপনার হারিয়ে যাওয়া জিনিসটি </h3>
     <Category/>
     
     <Footer/>
  
    </>
  )
}

export default App
