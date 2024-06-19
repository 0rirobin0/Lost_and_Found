import {React,useContext} from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from './GlobalState';


function Searchbar(props) {

    const {search, Setsearch} = useContext(GlobalStateContext);
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/searchlist');
    }

   const  onChange=(e)=>{
    e.preventDefault();
    Setsearch(e.target.value);
    }
    return (

        <div className="searchbarcontainer">

              
                {/* logo 2 */}
                <img src="/logo3.png" className='searchbar-logo' width="100px" alt="logo2" />

                <form className="Seachform d-flex align-items-center my-4" role="search" onSubmit={handleSearch}>
                    <input className="form-control  rounded-pill" 
                    id="searchbox"
                     type="search" 
                     placeholder="Find your items" 
                     aria-label="Search"
                     value={search}
                     onChange={onChange}
                    
                    required />
                    <button className="btn btn-success rounded-pill px-5 py-2 mx-2 my-2" id='findbtn' type="submit" ><b>Find</b></button>
                </form>

           
        </div>



    )
}

Searchbar.propTypes = {

}

export default Searchbar

