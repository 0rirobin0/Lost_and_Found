import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { GlobalStateContext } from './GlobalState'

function SearchproductItem({ posttype }) {
    const { mode } = useContext(GlobalStateContext);
    const btnclr = posttype == 'Post' ? 'success' : 'warning';
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
                        <h5 className="card-title text-start">Card title</h5>
                        <p className="card-text text-start">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Posted 3 mins ago</small></p>
                        <button type="button" className={'btn btn-' + btnclr}>{posttype == 'Post' ? 'Claim' : 'Found'}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

SearchproductItem.propTypes = {
    posttype: PropTypes.string,
}

export default SearchproductItem

