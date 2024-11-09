import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../SearchListPage/SearchListPage.css";
import { GlobalStateContext } from "../../components/GlobalState";
import SearchproductItem from "../../components/SearchproductItem";
import axios from "axios";

export default function SearchListPage() {
  const { textclr,mode } = useContext(GlobalStateContext);
  const [items, Setitems] = useState([]);
  const { search, Setsearch,categoryFilter, setCategoryFilter } = useContext(GlobalStateContext);
  const [searchtext, Setsearchtext] = useState(search);

  // Filters

  const [regionFilter, setRegionFilter] = useState("");     
  const [typeFilter, setTypeFilter] = useState("");        
  const [loading, setLoading] = useState(false);           

  const API_URL = import.meta.env.REACT_APP_API_URL;

  const onChange = (e) => {
    e.preventDefault();
    Setsearchtext(e.target.value);
  };
  console.log("search " + search);

  const onSearch = (e) => {
    e.preventDefault();
    Setsearch(searchtext);
  };

  // Fetching Data
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`${API_URL}/api/post/`);
        Setitems(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchItem();
  }, []); 


  const filteredItems = items.filter((item) => {
    const matchesSearch = item.itemName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    const matchesRegion = regionFilter ? item.division === regionFilter : true;
    const matchesType = typeFilter ? item.postType === typeFilter : true;
    return matchesSearch && matchesCategory && matchesRegion && matchesType;
  });

  return (
    <div className="Searchlist-page">
      <Navbar />
      {/* search bar Search page */}
      <div className="searchpage-searchbox-container d-flex justify-content-center">
        <form className="Seachform d-flex align-items-center my-4" role="search">
          <input
            className="form-control rounded-pill"
            id="searchpage-searchbox"
            type="search"
            placeholder="Find your items"
            aria-label="Search"
            value={searchtext}
            onChange={onChange}
          />

          <button
            className="btn btn-success rounded-pill px-5 py-2 mx-2 my-2"
            id="searchpage-findbtn"
            onClick={onSearch}
          >
            <b>Find</b>
          </button>
        </form>
      </div>
      <div className="filter">
        <hr className={"text-" + textclr} />

        <div className="Search-filter">
          {/* Post Types */}
          <select
            className="form-select"
            id="filter-item"
            aria-label="Default select example"
            onChange={(e) => setTypeFilter(e.target.value)}
            value={typeFilter}
          >
            <option value="">Select Types</option>
            <option value="post">Post</option>
            <option value="announcement">Announcement</option>
          </select>

          {/* Category */}
          <select
            className="form-select"
            id="filter-item"
            aria-label="Default select example"
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
          >
            <option value="">Select Category</option>
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
          <select
            className="form-select"
            id="filter-item"
            aria-label="Bangladesh Division Select"
            onChange={(e) => setRegionFilter(e.target.value)}
            value={regionFilter}
          >
            <option value="">Select Region</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Khulna">Khulna</option>
            <option value="Barishal">Barishal</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Mymensingh">Mymensingh</option>
          </select>
        </div>
      </div>

      <h3 className={"my-2 text-" + textclr}>Found Items: </h3>
      <hr className={"text-" + textclr} />
      <div className="search-items">
        {/* Show Loading Spinner */}
        {loading ? (
          <div className="loadingBar">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => <SearchproductItem key={item._id} item={item} />)
            ) : (
              <p className={`${mode==='dark' ? 'text-white':'text-black'}`}>No items found matching your filters.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
