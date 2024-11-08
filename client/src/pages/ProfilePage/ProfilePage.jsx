import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Darkmodebtn from '../../components/Darkmodebtn';
import { GlobalStateContext } from '../../components/GlobalState';
import './ProfilePage.css';

export default function ProfilePage() {

   const location =useLocation();
   const {textclr}=useContext(GlobalStateContext);

  // using context varibale
  const {Setprevpath}= useContext(GlobalStateContext);
  const { authtoken, Setauthtoken } = useContext(GlobalStateContext);

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
          headers: {
            'authtoken': authtoken
          },
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

<div className="profile-page-container">
<div className="container d-flex justify-content-center mt-1" id='profile-pageP'>
        <div className="col-md-6 col-lg-4" id='left-boxP'>


          {/* logo */}
          <Link to="/"> <img src="/logo.png" alt="" width={"150px"} className='py-3' /></Link>

          <div className="card text-center" id='card1' style={{ width: '18rem' }}>
            <div className="d-flex justify-content-center mt-3">
              <img
                src="/user.png"
                className="card-img-top"
                alt="avatar"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
            <div className="card-body">
              <h5 className={`card-title text-${textclr}`}>{user.username}</h5>
            </div>
            <ul className="list-group list-group-flush">
              {/* <li className="list-group-item fw-bold"></li> */}
              <li className="list-group-item fw-bold" id='message'>
              < i className="fa fa-envelope me-2"></i>Message
              </li>
              <li className="list-group-item fw-bold" id='mypost'>
              <i className="fas fa-pencil-alt me-2"></i>My Post
              </li>
              <li className="list-group-item fw-bold" onClick={logout} id='logoutbtn'>
                <i className="fa fa-sign-out" aria-hidden="true" ></i> Log Out
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='card-tex-center' id="right-boxP">
          <h3>My Post</h3>
          <p>Here you can see all your posts.</p>
          <h3>Messages</h3>
          <p>Check your recent messages here.</p>
        </div>
</div>

    </>
  );
}


