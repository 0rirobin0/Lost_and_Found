import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Avatar(props) {
  return (
  <Link to='/profile'>
  
   <div>
      <div className="container mx-1" width="100px" 
      height="100px" 
      object-fit="cover" >
        <img src="/user.png" width="50px" alt="Avatar" className="rounded-circle avatar"></img>

      </div>
    </div>
    </Link>
  )
}

Avatar.propTypes = {

}

export default Avatar

