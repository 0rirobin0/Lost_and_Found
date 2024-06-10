import React from 'react'
import PropTypes from 'prop-types'

function Avatar(props) {
  return (
    <div>
      <div className="container mx-1" width="100px" 
      height="100px" 
      object-fit="cover" >
        <img src="/user.png" width="50px" alt="Avatar" className="rounded-circle avatar"></img>

      </div>
    </div>
  )
}

Avatar.propTypes = {

}

export default Avatar

