import React from 'react'
import Navbar from '../../components/Navbar'
import '../SearchListPage/SearchListPage.css'



export default function SearchListPage() {
  return (
    <div className='Searchlist-page'>
      <Navbar />
      {/* search bar Search page */}
      <div className='searchpage-searchbox-container d-flex justify-content-center'>
        <form className="Seachform d-flex align-items-center my-4 " role="search">
          <input className="form-control  rounded-pill " id="searchpage-searchbox" type="search" placeholder="Find your items" aria-label="Search" />
          <button className="btn btn-success rounded-pill px-5 py-2 mx-2 my-2" id='searchpage-findbtn' type="submit" ><b>Find</b></button>
        </form>
      </div>
      <div className="filter" >


<div className="Search-filter">
{/* Post Types */}
<select class="form-select " id='filter-item' aria-label="Default select example">
  <option selected>Select Types</option>
  <option value="post">Post</option>
  <option value="Announcement">Announcement</option>
</select>

{/* category */}
<select class="form-select" id='filter-item' aria-label="Default select example">
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
<select class="form-select " id='filter-item' aria-label="Bangladesh Division Select">
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






    </div>
  )
}


