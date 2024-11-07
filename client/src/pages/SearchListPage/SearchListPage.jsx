import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import '../SearchListPage/SearchListPage.css'
import { GlobalStateContext } from '../../components/GlobalState'
import SearchproductItem from '../../components/SearchproductItem'
import axios from 'axios'

export default function SearchListPage() {
  const { textclr } = useContext(GlobalStateContext);
  const [items, Setitems] = useState([]);
  const {search, Setsearch} = useContext(GlobalStateContext);
  const [searchtext,Setsearchtext] = useState(search);


  const API_URL = import.meta.env.REACT_APP_API_URL;
  


  const onChange=(e)=>
  {
    e.preventDefault();
    Setsearchtext(e.target.value);

  }
  console.log('search '+search);
 
  const onSearch =(e)=>
  {
    e.preventDefault();
    Setsearch(searchtext);
  }



  // Fetching Data 
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/post/`);
        // const result = await response.json();
        Setitems(response.data); // Assuming response.data contains the result you need
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItem();

  }, []); // Empty dependency array means this effect runs once after the initial render

  console.log(items);







  return (
    <div className='Searchlist-page'>
      <Navbar />
      {/* search bar Search page */}
      <div className='searchpage-searchbox-container d-flex justify-content-center'>
        <form className="Seachform d-flex align-items-center my-4 " role="search">
          <input className="form-control  rounded-pill " 
          id="searchpage-searchbox" 
          type="search" 
          placeholder="Find your items" 
          aria-label="Search"
          value={searchtext}
          onChange={onChange} 
         />
          
          <button className="btn btn-success rounded-pill px-5 py-2 mx-2 my-2" id='searchpage-findbtn'  
           onClick={onSearch}><b>Find</b></button>
        </form>
      </div>
      <div className="filter" >
        <hr className={'text-' + textclr} />

        <div className="Search-filter">
          {/* Post Types */}
          <select className="form-select " id='filter-item' aria-label="Default select example">
            <option selected>Select Types</option>
            <option value="post">Post</option>
            <option value="Announcement">Announcement</option>
          </select>

          {/* category */}
          <select className="form-select" id='filter-item' aria-label="Default select example">
            <option selected>Select Category </option>
            <option value="Personal Items">Personal Items</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Clothings">Clothings</option>
            <option value="Documents">Documents</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Pets">Pets</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Medicine">Medicine</option>
            <option value="Personal Care">Personal Items</option>
            <option value="Money">Money</option>
            <option value="Others">Others</option>
          </select>

          {/* Region */}
          <select className="form-select " id='filter-item' aria-label="Bangladesh Division Select">
            <option selected>Select Region</option>
            <option value="dhaka">Dhaka</option>
            <option value="chattogram">Chattogram</option>
            <option value="rajshahi">Rajshahi</option>
            <option value="khulna">Khulna</option>
            <option value="barishal">Barishal</option>
            <option value="sylhet">Sylhet</option>
            <option value="rangpur">Rangpur</option>
            <option value="mymensingh">Mymensingh</option>
          </select>


        </div>

      </div>


      <h3 className={'my-2 text-' + textclr}>Found Items: </h3>
      <hr className={'text-' + textclr} />
      <div className="search-items" >
      {items.length > 0 ?
        items.filter((item)=>
         {
          return search.toLowerCase() === ''? item
          : item.itemName.toLowerCase().includes(search);
         }
        ).map((item) => (

        

            <SearchproductItem
              key={item._id}
              posttype={item.postType}
              itemName={item.itemName}
              division={item.division}
              datetime={item.foundDateTime} />

          

        ))
        // loading bar

        :
        <div className="loadingBar">
           <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      </div>


      }
      </div>











    </div>
  )
}


