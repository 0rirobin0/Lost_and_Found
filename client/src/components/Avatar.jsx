import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Avatar({role}) {

 

  return (
   <Link to={role==='admin' ? "/admin":"/profile"}>
   <div>
      <div className="container mx-1" width="100px" 
      height="100px" 
      object-fit="cover" >
        <img src="/user.png" width="50px" alt="Avatar" className="rounded-circle avatar"></img>

      </div>
    </div>
    </Link>
  );
}

Avatar.propTypes = {
  role:PropTypes.string.isRequired,
};

export default Avatar;

