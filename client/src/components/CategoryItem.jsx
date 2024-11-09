import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link,useNavigate } from 'react-router-dom'
import { GlobalStateContext } from './GlobalState';


function CategoryItem({color,name,founds,imgurl}) {
    const { categoryFilter, setCategoryFilter } = useContext(GlobalStateContext);
    const navigate = useNavigate();
    const handleitemClick = () => {
        navigate('/searchlist');
        setCategoryFilter(name);
    }


    return (
      
       
       <div className={'item d-flex text-bg-'+color} onClick={handleitemClick}>
            <div className="image">
                <img src={imgurl} alt="" width="100px"/>
            </div>
            <div className='itemtext m-2'>
                <b className='Ctext my-2'><h4>{name}</h4></b>
                <p className="founds"><b>Found</b><br />{founds} items</p>
            </div>
        </div>
       
     
      
    )
}

CategoryItem.propTypes = {

}

export default CategoryItem

