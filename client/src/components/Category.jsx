import React from 'react'
import PropTypes from 'prop-types'
import CategoryItem from './CategoryItem'

function Category(props) {
    return (
        <div className='category'>
           <button className='btn btn-primary rounded-pill px-4 py-2'><b>POST</b></button>

        <div className="container   ">
            <div className="row">
            <h2>Browse By Category </h2>
                <div className="col-md-3 my-3  mx-3" >
                    <CategoryItem color="success" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                <div className="col-md-3 my-3 mx-3" >
                    <CategoryItem color="danger" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                <div className="col-md-3 my-3 mx-3" >
                    <CategoryItem color="primary" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                <div className="col-md-3 my-3 mx-3" >
                    <CategoryItem color="info" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                <div className="col-md-3 my-3 mx-3" >
                    <CategoryItem color="success" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                <div className="col-md-3 my-3 mx-3" >
                    <CategoryItem color="danger" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                <div className="col-md-3 my-3 mx-3" >
                    <CategoryItem color="primary" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                <div className="col-md-3 my-3 mx-3" >
                    <CategoryItem color="info" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                <div className="col-md-3 my-3 mx-3" >
                    <CategoryItem color="success" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                <div className="col-md-3 my-3 mx-3" >
                    <CategoryItem color="danger" name="Wallets" founds="57" imgurl="./Categoryimages/wallet.png" />
                </div>
                
               
                

            </div>

        </div>
        </div>
    )
}

Category.propTypes = {

}

export default Category

