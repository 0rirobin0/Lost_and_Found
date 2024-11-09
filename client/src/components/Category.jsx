import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import { GlobalStateContext } from './GlobalState';

function Category() {
  const { mode } = useContext(GlobalStateContext);
  let darktext = mode === 'dark' ? 'dark' : 'light';

  // Array of category objects
  const categories = [
    { name: "Personal Items", founds: "57", imgurl: "./Categoryimages/wallet.png" },
    { name: "Electronics", founds: "57", imgurl: "./Categoryimages/smartphone.png" },
    { name: "Accessories", founds: "57", imgurl: "./Categoryimages/handbag.png" },
    { name: "Clothings", founds: "57", imgurl: "./Categoryimages/jacket.png" },
    { name: "Documents", founds: "57", imgurl: "./Categoryimages/visa.png" },
    { name: "Vehicle", founds: "57", imgurl: "./Categoryimages/cycling.png" },
    { name: "Pets", founds: "57", imgurl: "./Categoryimages/cat.png" },
    { name: "Office Supplies", founds: "57", imgurl: "./Categoryimages/stationery.png" },
    { name: "Medicine", founds: "57", imgurl: "./Categoryimages/medicine.png" },
    { name: "Personal Care", founds: "57", imgurl: "./Categoryimages/make-up.png" },
    { name: "Money", founds: "57", imgurl: "./Categoryimages/money.png" },
    { name: "Others", founds: "57", imgurl: "./Categoryimages/book.png" }
  ];

  return (
    <>
      <div className='category'>
        <h4 className={'text-bg-' + darktext}>Browse By Category</h4>
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-3" key={index}>
              <CategoryItem
                color={mode}
                name={category.name}
                founds={category.founds}
                imgurl={category.imgurl}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

Category.propTypes = {};

export default Category;
