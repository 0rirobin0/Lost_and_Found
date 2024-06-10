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
                            <CategoryItem color="success" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="danger" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3" >
                            <CategoryItem color="primary" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="info" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="success" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="danger" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="primary" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="info" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="success" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="danger" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="primary" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>
                        <div className="col-md-3  " >
                            <CategoryItem color="info" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                        </div>




                    </div>

                </div>
           
        </>
    )
}

Category.propTypes = {

}

export default Category

