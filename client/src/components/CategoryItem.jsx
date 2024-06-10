import React from 'react'
import PropTypes from 'prop-types'

function CategoryItem(props) {
    return (
        <div className={'item d-flex text-bg-'+props.color}>
            <div className="image">
                <img src={props.imgurl} alt="" width="100px"/>
            </div>
            <div className='itemtext m-2'>
                <b className='Ctext my-2'><h4>{props.name}</h4></b>
                <p className="founds"><b>Found</b><br />{props.founds} items</p>
            </div>
        </div>
    )
}

CategoryItem.propTypes = {

}

export default CategoryItem

