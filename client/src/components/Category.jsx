import React from 'react'
import PropTypes from 'prop-types'
import CategoryItem from './CategoryItem'

function Category(props) {
    let darktext = props.mode == 'dark' ? 'dark' : 'light';

    
    return (
        <>
          
            <div className='category '>

              
            <h4 className={'text-bg-'+darktext}>Browse By Category </h4>
                    <div className="row">

                        <div className="col-md-3" >
                            <CategoryItem color="success" name="Personal Items" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="danger" name="Electronics" founds="57" imgurl="./Categoryimages/smartphone.png" />
                        </div>
                        <div className="col-md-3" >
                            <CategoryItem color="primary" name="Accessories" founds="57" imgurl="./Categoryimages/handbag.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="info" name="Clothings" founds="57" imgurl="./Categoryimages/jacket.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="success" name="Documents" founds="57" imgurl="./Categoryimages/visa.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="danger" name="Vehicle" founds="57" imgurl="./Categoryimages/cycling.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="primary" name="Pets" founds="57" imgurl="./Categoryimages/cat.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="info" name="Office Supplies" founds="57" imgurl="./Categoryimages/stationery.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="success" name="Medicine" founds="57" imgurl="./Categoryimages/medicine.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="danger" name="Personal Care" founds="57" imgurl="./Categoryimages/make-up.png" />
                        </div>
                        
                        <div className="col-md-3  " >
                            <CategoryItem color="primary" name="Money" founds="57" imgurl="./Categoryimages/money.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="info" name="Others" founds="57" imgurl="./Categoryimages/book.png" />
                        </div>




                    </div>

                </div>
           
        </>
    )
}

Category.propTypes = {

}

export default Category

