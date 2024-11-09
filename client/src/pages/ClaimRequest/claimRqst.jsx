import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Darkmodebtn from '../../components/Darkmodebtn';
import { GlobalStateContext } from '../../components/GlobalState';
import './claimRqst.css';

export default function AdminPage() {

   const location =useLocation();

  // using context varibale
  const {Setprevpath}= useContext(GlobalStateContext);
  const { authtoken, Setauthtoken } = useContext(GlobalStateContext);
  const {textclr}=useContext(GlobalStateContext);
  const [totalClaims, setTotalClaims] = useState(0);
  const [totalFounds, setTotalFounds] = useState(0);

  const API_URL=import.meta.env.REACT_APP_API_URL;

  //state variables
  const [claims,setclaims]=useState([]);
  const [posts,setposts]=useState([]);


  // setting prevpath as /profile
   Setprevpath(location.pathname);


  const [user, Setuser] = useState({
    username: '',
    phone: '',
  })

  const navigate = useNavigate();

  // check logged in or not if not sent to login page
  useEffect(() => {
    const userCookie=()=>{
      
    }
  }, [authtoken]);


  // fetching userdata through authtoken
  useEffect(() => {
    const fetchuserdata = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/getuser`, {
          withCredentials:true,
          timeout: 3000,
        });

        console.log(response.data.username);

        // set user data 
        Setuser({
          username:response.data.username,
          phone:response.data.phone,
        })


        console.log(user.username);




      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Response error:', error.response.status, error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Request error:', error.request);
        } else {
          // Something else happened
          console.error('Error:', error.message);
        }
      }
    };

    fetchuserdata();
  }, [authtoken]);

  //Fetch claims
  useEffect(()=>{
    const fetchClaims=async()=>{
      try {
        const response= await axios.get(`${API_URL}/api/claim`,{withCredentials:true});
        setclaims(response.data);
      } catch (error) {
        console.error("Failed to fetch claims",error);
      }
    };
    fetchClaims();
  },[]);

  //FetchPost
  useEffect(()=>{
    const fetchPost=async()=>{
      try{
        const response = await axios.get(`${API_URL}/api/post`,{
          headers:{authtoken}
        });
        setposts(response.data);
      }catch(error){
        console.error("Failed to Fetch posts",error);
      }
    };
    fetchPost();
  },[]);


//Handle action for approving or declining claim items
const handleAction=async(claimId,status)=>{
  try {
    await axios.patch(`${API_URL}/api/claim/${claimId}`,{claimStatus:status});
    alert(`stauts${status} successfully!`);
  } catch (error) {
    console.error("Failed to update claimStatus to ${status}",error);
  }
};

//Fetch total claims and found
useEffect(()=>{
  const fetchCounts=async()=>{
    try {
      //Fetch total claims
      const claimsResponse=await axios.get(`${API_URL}/api/claim/count`);
      setTotalClaims(claimsResponse.data.totalClaims);

      //Fetch total Founds
      const foundsResponse=await axios.get(`${API_URL}/api/found/count`);
      setTotalFounds(foundsResponse.data.totalFounds);
    } catch (error) {
      console.error("Error fetching counts",error);
    }
  };
  fetchCounts;
},[]);


  // logout profile
  const logout = () => {
    Setauthtoken(null);
    navigate('/');
  }



  return (
    <>
    <Darkmodebtn/>

      <div className="container d-flex mt-4" id='claimrqst-page'>
        {/* left box */}
        <div className="leftbox " id='left-boxCR'>


          {/* logo */}
          <Link to="/"> <img src="/logo.png" alt="" width={"150px"} className='py-3' /></Link>

          <div className="card text-center" style={{ width: '18rem' }} id='cont.'>
            <div className="d-flex justify-content-center mt-3">
              <img
                src="/user.png"
                className="card-img-top"
                alt="avatar"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
            </div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item fw-bold"></li> */}
              <li className="list-group-item fw-bold">
                <Link to="/claimrqst">
              <i className="fas fa-file-alt" style={{ marginRight: '10px' }}></i> Claim Request({totalClaims})
              </Link>
              </li>
              <li className="list-group-item fw-bold">
                <Link to="/foundrqst">
              <i className="fas fa-search" style={{ marginRight: '10px' }}></i>Found Request({totalFounds})
              </Link>
              </li>
              <li className="list-group-item fw-bold" onClick={logout} id='logoutbtn'>
                <i className="fa fa-sign-out" aria-hidden="true" ></i> Log Out
              </li>
            </ul>
          </div>


        </div>


        {/* right-box */}
        {/* right-box */}
<div className="rigt-box d-flex justify-content-between" id="right-boxCR">
  {/* Post Item Table */}
  <div className={"table-container text-"+textclr} id='postItem' >
    <h3>Claim Request</h3>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Details</th>
          <th>Claim Request</th>
        </tr>
      </thead>
      <tbody>
        {claims.map(claim =>{
           <tr key={claim.id}>
           <td>{claim.id}</td>
           <td>{claim.details}</td>
           <td>
            <button onClick={()=>handleAction(claim.id,'Approve')}>Approve</button>
            <button onClick={()=>handleAction(claim.id,'Decline')}>Decline</button>
           </td>
         </tr>
        })}
      </tbody>
    </table>
  </div>

  </div>
      </div>
    </>
  );
}



