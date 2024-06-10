import React from 'react'
import PropTypes from 'prop-types'

function Searchbar(props) {
  return (
    <div className="container d-flex justify-content-center" id='searchbar-container'>
 <form className="d-flex searchbar" role="search">
    <input className="form-control me-2 rounded-pill" id="searchbox" type="search" placeholder="Find your items" aria-label="Search"/>
    <button className="btn btn-success rounded-pill px-5" type="submit">Search</button>
  </form>
    </div>
   
  )
}

Searchbar.propTypes = {

}

export default Searchbar

