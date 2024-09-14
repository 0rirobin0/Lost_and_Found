import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { GlobalStateContext } from './GlobalState'
import { Link } from 'react-router-dom';

function SearchproductItem({ posttype, itemName, division, datetime }) {
    const { mode } = useContext(GlobalStateContext);
   
    const btnclr = posttype === 'post' ? 'success' : 'warning';


    return (

        <div className={'card mb-3 justify-content-start shadow mx-auto  my-3 text-bg-' + mode} style={{ width: "800px" }}>

            {/* badge */}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                {posttype}
            </span>


            <div className="row g-0">



                <div className="col-md-4 p-2 border m-auto ">

                    <img src="/Categoryimages/cat.png" style={{ width: "120px", height: "140px" }} className="img-fluid rounded-center m-2 
      " alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-start">{itemName}</h5>
                        <p className="card-text text-start">{ division}</p>
                        <p className="card-text"><small className="text-body-secondary">{'Posted : ' + datetime}</small></p>
                         {/* Wrapping the entire button in Link */}
                   {posttype === 'post' ? (
      <Link to="/claim">
        <button type="button" className={'btn btn-' + btnclr}>Claim</button>
      </Link>
    ) : (
      <Link to="/found">
        <button type="button" className={'btn btn-' + btnclr}>Found</button>
      </Link>
    )}
                    </div>

                </div>
            </div>
        </div>
    )
}

SearchproductItem.propTypes = {
    posttype: PropTypes.string,
    itemName: PropTypes.string,
    division: PropTypes.string,
    datetime: PropTypes.string,



}

export default SearchproductItem;

