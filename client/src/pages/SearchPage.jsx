import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import '../App.css'
import { GlobalStateContext } from '../components/GlobalState'


function SearchPage(props) { 
    const { mode, toggleMode } = useContext(GlobalStateContext);
    
  return (
    <div>
      <Navbar mode={mode} toggleMode={toggleMode}/>
      <Searchbar/>

    </div>
  )
}

SearchPage.propTypes = {

}

export default SearchPage

