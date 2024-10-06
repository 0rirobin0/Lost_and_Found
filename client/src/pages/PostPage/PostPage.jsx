import { useContext, useEffect } from 'react'
import { useState} from 'react';
import './PostPage.css'
import Darkmodebtn from '../../components/Darkmodebtn';
import {  Link, useNavigate,useLocation } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { GlobalStateContext } from '../../components/GlobalState';
import Alert from '../../components/Alert';
import axios from 'axios';





function PostPage(props) {
  const location = useLocation();
  const { mode, alert, showAlert } = useContext(GlobalStateContext);
  const navigate = useNavigate();
  const { authtoken} = useContext(GlobalStateContext);
  const {Setprevpath}= useContext(GlobalStateContext);
  const {user} = useContext(GlobalStateContext);
  
//  setting prevpath
  Setprevpath(location.pathname);
 
 
 
 
 
 
 
  // check logged in or not if not sent to login page



useEffect(() => {
  const gotologin = ()=>
  {
    navigate('/login');
  }
  
  
  
  if(!authtoken) gotologin();
  },[authtoken,navigate]);
  


  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    division: '',
    district: '',
    location: '',
    image: null,
    details: '',
    foundDateTime: '',
    rewardAmount: 0,
    postType: 'post',
    postedBy: user ? user.id:null
  });

  // not need 

  const [formValidation, setFormValidation] = useState({
    itemName: false,
    category: false,
    division: false,
    district: false,
    location: false,
    image: false,
    details: false,
    foundDateTime: false,
    rewardAmount: false,

  });





















  const Categories = [
    "Personal Items",
    "Electronics",
    "Accessories",
    "Clothings",
    "Documents",
    "Vehicle",
    "Pets",
    "Office Supplies",
    "Medicine",
    "Personal Care",
    "Money",
    "Others"
  ];





  const division = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];

  const district = {
    Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
    Chattogram: ["Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"],
    Khulna: ["Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
    Rajshahi: ["Bogura", "Joypurhat", "Naogaon", "Natore", "Chapai Nawabganj", "Pabna", "Rajshahi", "Sirajganj"],
    Barisal: ["Barguna", "Barisal", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur"],
    Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
    Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
    Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"]
  };



  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
    });
  };



  //======== form submit handle


  const handleSubmit = async (e) => {
    e.preventDefault();


    // making formdata

    const formDataToSend = new FormData();

    formDataToSend.append('itemName', formData.itemName);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('division', formData.division);
    formDataToSend.append('district', formData.district);
    formDataToSend.append('location', formData.location);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    formDataToSend.append('details', formData.details);
    formDataToSend.append('foundDateTime', formData.foundDateTime);
    formDataToSend.append('rewardAmount', formData.rewardAmount);
    formDataToSend.append('postType', formData.postType);

    //  posting data to host server
    try {
      const response = await axios.post('http://localhost:3000/api/post', formDataToSend, {
        headers: {

          'Content-Type': 'multipart/form-data'
        },
        timeout: 5000,
      });
      console.log(response);
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

    // scroll too top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      // Optional: smooth scrolling animation
    });

    // setalert post 
    showAlert("success", ' Successfully published');

    //  Reset the form
    // setFormData(
    //   {
    //     itemName: '',
    //     category: '',
    //     division: '',
    //     district: '',
    //     location: '',
    //     image: null,
    //     details: '',
    //     foundDateTime: '',
    //     rewardAmount: '',
    //     postType: 'post'
    //   }
    // )

    //  after submit navigate to homepage
    // setTimeout(() => {
    //   Navigate('/');
    // }, 4000);







    // Perform validation and submission logic here

    console.log('Form submitted:', formDataToSend);

  };







  // Handle Post and Announcement
  const [postbtntext, Setpostbtntext] = useState("active")
  const [annbtntext, Setannbtntext] = useState("")


  const gotopost = async () => {
    Setpostbtntext("active");
    Setannbtntext("");
    setFormData({
      ...formData,
      postType: 'post'
    });
  }




  const gotoAnnouncement = async () => {
    Setpostbtntext("");
    Setannbtntext("active");
    setFormData({
      ...formData,
      postType: 'announcement'
    });


    // checking get data
    try {
      const response = await axios.get('http://localhost:3000/api/post');
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    // working


  }

  console.log(formData.postType);

  return (
    <>
      {/* Nav Tabs */}
      <div className="postpage-navbar d-flex justify-content-between align-self-center"  >
        {/* logo */}

        <Link to="/"><img src="/logo.png" alt="logo" width="150px" className='mx-4 my-0' /></Link>


        <ul className="nav nav-tabs d-flex  align-self-end " id='tabs'>

          <li className="nav-item">
            <p className={'nav-link ' + postbtntext} onClick={gotopost} >Post </p>
          </li>
          <li className="nav-item">
            <p className={'nav-link ' + annbtntext} onClick={gotoAnnouncement} >Announcement</p>
          </li>

        </ul>

        <div className="postpage-rightnav d-flex align-items-center ">
          <Darkmodebtn />
          <Avatar />
        </div>



      </div>

      {/* Alert Form Submited */}

      <Alert alert={alert} />


      {/* post form */}

      <div className={'post-container my-3 rounded-5  py-5 text-bg-' + mode} style={{ maxWidth: '1000px', margin: '40px auto' }} >
        <form className="g-3" onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="mb-3 text-start">
            <label htmlFor="itemName" className="form-label ">Item Name</label>
            <input
              type="text"
              className={`form-control ${formValidation.itemName ? 'is-invalid' : ''}`}
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide an item name.
            </div>
          </div>
          <div className="mb-3 text-start ">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className={`form-select ${formValidation.category ? 'is-invalid' : ''}`}
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Choose...</option>
              {Categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}

            </select>
            <div className="invalid-feedback">
              Please select a category.
            </div>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="division" className="form-label">Division</label>
            <select
              className={`form-select ${formValidation.division ? 'is-invalid' : ''}`}
              id="division"
              name="division"
              value={formData.division}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Choose...</option>
              {division.map((division) => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
            <div className="invalid-feedback">
              Please select a valid division.
            </div>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="district" className="form-label">District</label>
            <select
              className={`form-select ${formValidation.district ? 'is-invalid' : ''}`}
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              disabled={!formData.division}
            >
              <option value="" disabled>Choose...</option>
              {formData.division && district[formData.division]?.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
            <div className="invalid-feedback">
              Please select a valid district.
            </div>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="location" className="form-label">Location</label>
            <textarea
              className={`form-control ${formValidation.location ? 'is-invalid' : ''}`}
              id="location"
              name="location"
              placeholder='e.g. Near Houston Cafe Table no 3'
              value={formData.location}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please provide a location.
            </div>
          </div>
          {/* image */}
          <div className="mb-3 text-start">
            <label htmlFor="iplaceholder='e.g. In Houton Cafe Table no 3'mage" className="form-label">{formData.postType == 'post' ? 'Upload Image (required)' : ' Upload Image (optional)'}</label>


            <input
              type="file"
              className={`form-control ${formValidation.image ? 'is-invalid' : ''}`}
              id="image"
              name="image"
              onChange={handleChange}
              // not required for announcemnet
              required={formData.postType == 'post'}
            />
            <div className="invalid-feedback">
              Please upload an image.
            </div>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="details" className="form-label">Details</label>
            <textarea
              className={`form-control ${formValidation.details ? 'is-invalid' : ''}`}
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder='e.g. color-black ,Scratch on Back ,BackShell Broken'
              required
            />
            <div className="invalid-feedback">
              Please provide details.
            </div>
          </div>
          {/* Date and Time */}
          <div className="mb-3 text-start">
            <label htmlFor="foundDateTime" className="form-label">{formData.postType == 'post' ? 'Found Date and Time (required)' : 'Lost Date and Time(optional)'}</label>
            <input
              type="datetime-local"
              className={`form-control ${formValidation.foundDateTime ? 'is-invalid' : ''}`}
              id="foundDateTime"
              name="foundDateTime"
              value={formData.foundDateTime}
              onChange={handleChange}
              required={formData.postType == 'post'}
            />
            <div className="invalid-feedback">
              Please provide a valid date and time.
            </div>
          </div>
          {/* reward */}
          <div className="mb-3 text-start" >
            <label htmlFor="rewardAmount " className="form-label">
              Reward Amount  {formData.rewardAmount} Taka
            </label>
            <input
              type="range"
              className={`form-range ${formValidation.rewardAmount ? 'is-invalid' : ''}`}
              id="rewardAmount"
              name="rewardAmount"
              value={formData.rewardAmount}
              onChange={handleChange}
              min="0"
              max="500"

            />
            <div className="d-flex justify-content-between">
              <span>FREE</span>
              <span>500 Taka</span>
            </div>
            <div className="invalid-feedback">
              Please provide a valid reward amount between 0 and 500.
            </div>
          </div>

          <div className="mb-3 text-center">
            <button className="btn btn-info px-5 py-2 rounded-pill" type="submit" ><b>{formData.postType == 'post' ? 'Post' : 'Announce'}</b></button>
          </div>
        </form>
      </div>





    </>
  );
}

PostPage.propTypes = {

}

export default PostPage;

