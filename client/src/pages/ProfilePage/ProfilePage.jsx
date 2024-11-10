import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Darkmodebtn from "../../components/Darkmodebtn";
import { GlobalStateContext } from "../../components/GlobalState";
import ProfileMessageBox from "../../components/ProfileMessageBox";

import "./ProfilePage.css";
import Cookies from 'js-cookie';
import ProfilePost from "../../components/ProfilePost";
import ProfileActivity from "../../components/ProfileActivity";
export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { textclr } = useContext(GlobalStateContext);
  const [Component, setComponent] = useState("message");
  var userlog;
 
  // Using context variables
  const { Setprevpath, handleLogout } =
    useContext(GlobalStateContext);

  const API_URL = import.meta.env.REACT_APP_API_URL;
  
  const logout = ()=>
  {
    handleLogout();
    navigate('/');
  }
 

  // Setting prevpath as /profile
  Setprevpath(location.pathname);

  const [user, Setuser] = useState({
    username: "",
    phone: "",
  });


  // Check if logged in; if not, redirect to login page
  useEffect(() => {
     // checking cookies
    
   const userCookie = Cookies.get('user');
   if (userCookie) {
       userlog = JSON.parse(userCookie);
   } else {
       userlog = null; 
   }

    if (!userlog) navigate("/login");
  }, [userlog, navigate]);

  // Fetching user data with authtoken
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/getuser`, {
          withCredentials: true,
        });

        // Set user data
        Setuser({
          username: response.data.username,
          phone: response.data.phone,
        });
      } catch (error) {
        if (error.response) {
          console.error(
            "Response error:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error("Request error:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    };




    fetchUserData();
  }, []);

  // Logout function


  return (
    <>
      <Darkmodebtn />

      <div className=" profile-page-container d-flex justify-content-center align-items-center">
        {/* Left Box */}
        <div className=" fixed-top mt-4 col-md-6 col-lg-4" id="left-boxP">
          <div
            className="card text-center"
            id="card1"
            style={{ width: "18rem" }}
          >
            {/* Logo */}
            <Link to="/">
              <img src="/logo.png" alt="" width="150px" className="py-2" />
            </Link>
            <div className="d-flex justify-content-center mt-3">
              <img
                src="/user.png"
                className="card-img-top"
                alt="avatar"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="card-body">
              <h5 className={`card-title text-${textclr}`}>{user.username}</h5>
              <h5 className={`card-title text-${textclr}`}>+880{user.phone}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item fw-bold"
                id="message"
                onClick={() => setComponent("message")}
              >
                <i className="fa fa-envelope me-2"></i>Message
              </li>
              <li
                className="list-group-item fw-bold"
                id="post"
                onClick={() => setComponent("post")}
              >
                <i className="fas fa-pencil-alt me-2"></i>My Post
              </li>
              {/* actitivity */}
              <li
                className="list-group-item fw-bold"
                id="post"
                onClick={() => setComponent("activity")}
              >
                <i className="fas fa-pencil-alt me-2"></i>Activity log
              </li>
              <li
                className="list-group-item fw-bold"
                onClick={logout}
                id="logoutbtn"
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i> Log Out
              </li>
            </ul>
          </div>
        </div>
        {/* Right Side Box */}
        <div
          className="card-text-center w-50 h-100 border rounded bg-light"
          id="right-boxP"
        >
          {Component === "message" && <ProfileMessageBox /> }
          {Component === "post" &&  <ProfilePost/> }
          {Component === "activity" && <ProfileActivity/>  }
          
         
        </div>
      </div>
    </>
  );
}
