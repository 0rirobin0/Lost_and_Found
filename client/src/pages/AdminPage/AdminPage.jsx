import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useSyncExternalStore } from 'react';
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



  // setting prevpath as /profile
   Setprevpath(location.pathname);


  const [user, Setuser] = useState({
    username: '',
    phone: '',
  })

  const [totalPosts,setTotalPosts]=useState(0);
  const [totalAnnouncements,setTotalAnnouncements]=useState(0);
  const [totalClaims, setTotalClaims] = useState(0);
  const [totalFounds, setTotalFounds] = useState(0);
  const [claimsList,setClaimsList] = useState([]); //For displaying claims
  const [selectedPostId,setSelectedPostId] = useState(''); //To store post id
  const [selectedClaims,setSelectedClaims] = useState([]); //For claims comparison


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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/getuser`, {
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




  //Fetch total posts and announcements
  useEffect(()=>{
    const fetchCounts=async()=>{
      try {
        //Fetch Total posts
        const postResponse = await axios.get('http://localhost:3000/api/post/count/posts');
        setTotalPosts(postResponse.data.totalPosts);

        //Fetch Total announcement
        const announcementsResponse=await axios.get('http://localhost:3000/api/post/count/announcements');
        setTotalAnnouncements(announcementsResponse.data.totalAnnouncements);

        // Fetch Total claims
        const claimsResponse = await axios.get('http://localhost:3000/api/claim/count');
        setTotalClaims(claimsResponse.data.totalClaims);

        //Fetch Total Founds
        const foundsResponse = await axios.get('http://localhost:3000/api/claim/found');
        setTotalFounds(foundsResponse.data.totalFounds);
      } catch (error) {
        console.error("Error fetching counts:",error);
      }
    };
    fetchCounts();
  },[]);



  // logout profile
  const logout = () => {
    Setauthtoken(null);
    navigate('/');
  }

  //Fetch claims for a specific Post
  const fetchClaimsForPost=async(postId)=>{
    try {
      const response = await axios.get(`http://localhost:3000/api/claims/${postId}`,{
        headers:{Authorization:`Bearer ${authtoken}`}
      });
      setClaimsList(response.data.claims);
    } catch (error) {
      console.error('Error fetching claims',error);
    }
  };

  //Handle claim selection for comparison
  const handleClaimsSelection = (claim)=>{
    if(selectedClaims.includes(claim)){
      setSelectedClaims(selectedClaims.filter(c=>c!== claim));
    }else{
      setSelectedClaims([...selectedClaims,claim]);
    }
  };


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
              <li className="list-group-item fw-bold" id='message'>
              <i className="fas fa-envelope" style={{ marginRight: '10px' }}></i>Message
              </li>
              <li className="list-group-item fw-bold" id='claimrqst'>
              <i className="fas fa-file-alt" style={{ marginRight: '10px' }}></i> Claim Request({totalClaims})
              </li>
              <li className="list-group-item fw-bold" id='foundrqst'>
              <i className="fas fa-search" style={{ marginRight: '10px' }}></i>Found Request({totalFounds})
              </li>
              <li className="list-group-item fw-bold" onClick={logout} id='logoutbtn'>
                <i className="fa fa-sign-out" aria-hidden="true" ></i> Log Out
              </li>
            </ul>
          </div>


        </div>


        {/* right-box */}
        <div className="rightbox" id='right-box'>
          {/* circle */}
          <div className="circle-container" style={{ top: '100px', left: '150px' }} >
            <b className={`circle-text text-${textclr}`} >Total Posts</b>
          <div className='circle orange'>
            <b className={`circle-value text-${textclr}`} id='circle-value1'>{totalPosts}</b>
          </div>
          </div>
          <div className="circle-container" style={{ top: '100px', right: '150px' }}>
            <b className={`circle-text text-${textclr}`}>Total Announcements </b>
          <div className='circle yellow'>
            <b className={`circle-value text-${textclr}`} id='circle-value2'>{totalAnnouncements}</b>
          </div>
          </div>
          <div className="circle-container" style={{ bottom: '50px', right: '380px' }}>
            <b className={`circle-text text-${textclr}`}>Approve Request</b>
          <div className='circle blue'></div>
          </div>
        </div>






      </div>

    </>
  );
}


