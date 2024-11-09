import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import { Link, useNavigate ,useLocation} from 'react-router-dom';
import Darkmodebtn from '../../components/Darkmodebtn';
import './AdminPage.css'
import { useState, useContext } from 'react';
import { GlobalStateContext } from '../../components/GlobalState';
import axios from 'axios';

export default function AdminPage() {

   const location =useLocation();

  // using context varibale
  const {Setprevpath}= useContext(GlobalStateContext);
  const { authtoken, Setauthtoken } = useContext(GlobalStateContext);
  const {textclr}=useContext(GlobalStateContext);

  const API_URL=import.meta.env.REACT_APP_API_URL;

  // setting prevpath as /profile
   Setprevpath(location.pathname);


  const [user, Setuser] = useState({
    username: '',
    phone: '',
  })

  const navigate = useNavigate();

  // check logged in or not if not sent to login page
  useEffect(() => {
    const gotologin = () => {
      navigate('/login');
    }

    if (!authtoken) gotologin();
  }, [authtoken]);


  // getting userdata through authtoken
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










  // logout profile
  const logout = () => {
    Setauthtoken(null);
    navigate('/');
  }



  return (
    <>
    <Darkmodebtn/>

      <div className="container d-flex mt-4" id='profile-page'>
        {/* left box */}
        <div className="leftbox " id='left-box'>


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
              <i className="fas fa-file-alt" style={{ marginRight: '10px' }}></i> Claim Request
              </li>
              <li className="list-group-item fw-bold">
              <i className="fas fa-search" style={{ marginRight: '10px' }}></i>Found Request
              </li>
            </ul>
          </div>


        </div>


        {/* right-box */}
        <div className="rightbox" id='right-box'>
          {/* circle */}
        
        </div>






      </div>

    </>
  );
}


