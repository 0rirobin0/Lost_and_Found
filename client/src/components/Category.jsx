import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import CategoryItem from './CategoryItem'
import { GlobalStateContext } from './GlobalState';

function Category(props) {
    const {mode} = useContext(GlobalStateContext);
    let darktext = mode == 'dark' ? 'dark' : 'light';
  console.log("Homepage "+mode);
    
    return (
        <>
          
            <div className='category '>

              
            <h4 className={'text-bg-'+darktext}>Browse By Category </h4>
                    <div className="row">

                        <div className="col-md-3" >
                            <CategoryItem color={mode} name="Personal Items" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Electronics" founds="57" imgurl="./Categoryimages/smartphone.png" />
                        </div>
                        <div className="col-md-3" >
                            <CategoryItem color={mode} name="Accessories" founds="57" imgurl="./Categoryimages/handbag.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Clothings" founds="57" imgurl="./Categoryimages/jacket.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Documents" founds="57" imgurl="./Categoryimages/visa.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Vehicle" founds="57" imgurl="./Categoryimages/cycling.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Pets" founds="57" imgurl="./Categoryimages/cat.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Office Supplies" founds="57" imgurl="./Categoryimages/stationery.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Medicine" founds="57" imgurl="./Categoryimages/medicine.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Personal Care" founds="57" imgurl="./Categoryimages/make-up.png" />
                        </div>
                        
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Money" founds="57" imgurl="./Categoryimages/money.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color={mode} name="Others" founds="57" imgurl="./Categoryimages/book.png" />
                        </div>




                    </div>

                </div>
           
        </>
    )
}

Category.propTypes = {

}

export default Category

