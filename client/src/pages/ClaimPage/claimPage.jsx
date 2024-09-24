import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../../components/Navbar';
import './ClaimPage.css';
import smartphoneImage from '../../../public/Categoryimages/smartphone.png'; // Ensure this path is correct
import { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../../components/GlobalState';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function ClaimPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const { textclr } = useContext(GlobalStateContext);
  const {Setprevpath} = useContext(GlobalStateContext);
  const {authtoken} = useContext(GlobalStateContext);

  //State to store form inputs
  const[formData,setFormData]=useState({
    location:'',
    details:'',
    lostDate:'',
    lostTime:'',
    file:null,
  });

  const [message,setMessage]=useState('');

  //set previous path 
  Setprevpath(location.pathname);

  //check logged in or not,if not send to login page 
  useEffect(()=>{
  const gotologin=()=>{
    navigate('/login');
  }

  if(!authtoken)gotologin();
},[authtoken]);

//Handle form input change
const handleInputChange=(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value});
};

//Handle File upload
const handleFileChange=(e)=>{
  setFormData({...formData,file:e.target.files[0]});
};

//Handle form submission
const handleSubmit=async(e)=>{
  e.preventDefault();

  //creates a FormData object to prepare the data for submission
  const formDataToSubmit=new FormData();

  //Each field in the formData object is appended to the formData object,later we send it to the server
  formDataToSubmit.append('location',formData.location);
  formDataToSubmit.append('details',formData.details);
  formDataToSubmit.append('lostDate',formData.lostDate);
  formDataToSubmit.append('lostTime',formData.lostTime);
  formDataToSubmit.append('file',formData.file);
  
  
  //send the form data to the server
  try {
    const response =await axios.post('http://localhost/3000/api/claim',formDataToSubmit,{
      headers:{
        'content-Type':'multipart/form-data',
      },
    });
    setMessage(response.data.message);
  } catch (error) {
    console.error('There was an error submitting the form',error);
    setMessage('Failed to submit the form');
  }


}



  
  return (
    <>
    <Navbar/>
    <div className={"container d-flex justify-content-center align-items-center vh-100 text-"+textclr} id='Claim'>
      <div className="card mb-5" style={{ maxWidth: '540px' }} id='card'>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={smartphoneImage} className="img-fluid rounded-start" alt="Smartphone" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Samsung S22</h5>
              <p className="card-text">
                <FontAwesomeIcon icon={faLocationDot} /> Dhaka
              </p>
              <p className="card-text">
                <small className="text-body-secondary">25th May at 2:30 pm</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
     {/* Form Section */}
     <div className="form justify-content-center " id='detail'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3" id='form1'>
       <input 
       type="location" 
       className="form-control" 
       id="exampleFormControlInput1" 
       placeholder="Location : Details location, where you lost the item."
       value={formData.location}
       onChange={handleInputChange}
       required 
       />
     </div>
     <div className={`mb-3 text-${textclr} `}id='form2'>
       <label form="formFile" className="form-label">Upload Image</label>
       <input 
       className="form-control" 
       type="file" 
       id="formFile"
       onChange={handleFileChange}
       required
       />
     </div>
     <div className="mb-3" id='form3'>
       <textarea 
       className="form-control" 
       id="exampleFormControlTextarea1" 
       rows="3"
       placeholder='Write details about the item that is yours'
       value={formData.details}
       onChange={handleInputChange}
       required
       ></textarea>
     </div>
     <div className="row" id='form4'>
  <div className="col">
    <input 
    type="date" 
    className="form-control" 
    placeholder="Lost Date" 
    aria-label="Date"
    value={formData.lostDate}
    onChange={handleInputChange}
    required
    />
  </div>
  <div className="col">
    <input 
    type="time" 
    className="form-control" 
    placeholder="Lost Time" aria-label="Time"
    value={formData.lostTime}
    onChange={handleInputChange}
    required
    />
  </div>
  <div className="col-auto">
    <Link to="/admin">
    <button type="submit" className="btn btn-primary">Submit</button>
    </Link>
  </div>
  </div>
      </form>
   </div>
 </>
  );
}