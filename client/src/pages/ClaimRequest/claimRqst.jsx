import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Darkmodebtn from "../../components/Darkmodebtn";
import { GlobalStateContext } from "../../components/GlobalState";
import "./claimRqst.css";
import Cookies from "js-cookie";

export default function AdminPage() {
  const location = useLocation();

  const { Setprevpath } = useContext(GlobalStateContext);
  const { authtoken, handleLogout } =
    useContext(GlobalStateContext);
  const { textclr } = useContext(GlobalStateContext);
  const [Product, setProduct] = useState([]);
  const [totalClaims, setTotalClaims] = useState(0);
  const [totalFounds, setTotalFounds] = useState(0);

  const API_URL = import.meta.env.REACT_APP_API_URL;

  // State variables
  const [claims, setClaims] = useState([]);
  const [posts, setPosts] = useState([]);
  let userlog;

  // Setting prevpath as /profile
  Setprevpath(location.pathname);

  const [user, Setuser] = useState({
    username: "",
    phone: "",
  });

  const navigate = useNavigate();

  // Check logged in or not if not sent to login page
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      userlog = JSON.parse(userCookie);
    } else {
      userlog = null;
    }

    if (!userlog) navigate("/login");
  }, []);

  // Fetch user data through authtoken
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/getuser`, {
          withCredentials: true,
          timeout: 3000,
        });

        Setuser({
          username: response.data.username,
          phone: response.data.phone,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userlog]);

  
  const getProduct = async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/api/post/get/${productId}`, {
        withCredentials: true,
      });
      return response.data.item;
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

   // Function to fetch products for all claims
   const fetchProductsForClaims = async () => {
    try {
      const productPromises = claims.map(async (claim) => {
        if (claim.itemId) {
          const product = await getProduct(claim.itemId);
          return product;
        }
        return null;  // Return null if no itemId exists
      });

      // Wait for all promises to resolve and update the products state
      const productsArray = await Promise.all(productPromises);
      setProduct(productsArray.filter(product => product !== null));  // Filter out null values
    } catch (error) {
      console.error("Failed to fetch products for claims", error);
    }
  };

  // Fetch claims
  useEffect( () => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/claim`, {
          withCredentials: true,
        });
        setClaims(response.data);
      } catch (error) {
        console.error("Failed to fetch claims", error);
      }
    };
    fetchClaims();
    fetchProductsForClaims();

  }, []);

  // Handle action for approving or declining claim items
  const handleAction = async (claimId,userId,itemName, status) => {
    try {
      await axios.patch(`${API_URL}/api/claim/${claimId}`, {
        claimStatus: status,
      });
     
      alert(`Status updated to ${status} successfully!`);
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim._id === claimId ? { ...claim, claimStatus: status } : claim
        )
      );
    } catch (error) {
      console.error(`Failed to update claimStatus to ${status}`, error);
    }
  };

  

  // Logout function
  const logout = () => {
    handleLogout();
    navigate("/");
  };

  
  return (
    <>
      <Darkmodebtn />

      <div className="container d-flex mt-4" id="claimrqst-page">
        {/* Left box */}
        <div className="leftbox" id="left-boxCR">
          {/* Logo */}
          <Link to="/">
            <img src="/logo.png" alt="" width={"150px"} className="py-3" />
          </Link>

          <div
            className="card text-center"
            style={{ width: "18rem" }}
            id="cont."
          >
            <div className="d-flex justify-content-center mt-3">
              <img
                src="/user.png"
                className="card-img-top"
                alt="avatar"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item fw-bold">
                <Link to="/claimrqst">
                  <i
                    className="fas fa-file-alt"
                    style={{ marginRight: "10px" }}
                  ></i>{" "}
                  Claim Request({totalClaims})
                </Link>
              </li>
              <li className="list-group-item fw-bold">
                <Link to="/foundrqst">
                  <i
                    className="fas fa-search"
                    style={{ marginRight: "10px" }}
                  ></i>
                  Found Request({totalFounds})
                </Link>
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

        {/* Right box */}
        <div
          className="right-box d-flex justify-content-between"
          id="right-boxCR"
        >
          {/* Post Item Table */}
          <div className={"table-container text-" + textclr} id="postItem">
            <h3>Claim Request</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Claim Location</th>
                  <th>Lost Date & Time</th>
                  <th>Claim Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim,index) => (
                  <tr key={claim._id}>
                   
                    <td>{JSON.stringify(Product[index])}</td>
                    <td>{claim.details}</td>
                    <td>{claim.location}</td>
                    <td>{new Date(claim.lostDateTime).toLocaleString()}</td>
                    <td>{claim.claimStatus}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleAction(claim._id,claim.userId,Product[0].itemName, "Approve")}
                        disabled={claim.claimStatus !== "pending"}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleAction(claim._id, "Decline")}
                        disabled={claim.claimStatus !== "pending"}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
