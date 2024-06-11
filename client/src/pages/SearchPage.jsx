import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import '../App.css'
import { ModeContext } from '../components/Mode'


function SearchPage(props) { 
    const { mode, toggleMode } = useContext(ModeContext);
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

