import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../../components/Navbar';
import './ClaimPage.css';
import smartphoneImage from '../../../public/Categoryimages/smartphone.png'; // Ensure this path is correct
import { useContext, useEffect, useState } from 'react';
import { GlobalStateContext } from '../../components/GlobalState';
import { useLocation, useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import Alert from '../../components/Alert';



export default function ClaimPage() {

  const {id}=useParams(); //get posts unique id
  const location = useLocation();
  const navigate = useNavigate();
  const { textclr,Setprevpath,authtoken ,showAlert} = useContext(GlobalStateContext);
  const {updateClaimsCount}=useContext(GlobalStateContext);
  const [claimsList,setClaimsList]= useState([]); //store multiple claim for this post
 
   //set previous path 
   Setprevpath(location.pathname);

    //check logged in or not,if not send to login page 
  useEffect(()=>{
    const gotologin=()=>{
      navigate('/login');
    }
    if(!authtoken)gotologin();
  },[authtoken]);
  
  //State to store form inputs
  const[formData,setFormData]=useState({
    location:'',
    details:'',
    date:'',
    time:'',
    image:null,
  });

  // Get itemId from URL params or state (based on your logic)
  const { itemId } = useParams(); // If itemId is passed as URL param

  const [message,setMessage]=useState('');

//Handle form input change
const handleInputChange=(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value});
};

//Handle File upload
const handleFileChange=(e)=>{
  const{name,value,type,checked,files}=e.target;
  setFormData({
    ...formData,
    [name]:type==='checkbox'? checked :(type==='file'?files[0]:value)});
};

//Fetch all claims related to this post
const fetchClaims=async()=>{
  try {
    const response = await axios.get(`http://localhost:3000/api/claims/${id}`,{
      headers:{
        Authorization:`Bearer ${authtoken}`,
      },
    });
    setClaimsList(response.data.claims);
  } catch (error) {
    console.error('Error fetching claims',error);
  }
}
//Handle form submission
const handleSubmit=async(e)=>{
  e.preventDefault();

   // Check if required fields are filled
   if (!formData.location || !formData.details || !formData.lostTime ||!formData.lostDate)  {
    // Show an alert if any required field is missing
    showAlert('danger', 'Please fill in all required fields.');
    return; // Prevent form submission
  }

  //creates a FormData object to prepare the data for submission
  const formDataToSubmit=new FormData();

  //Each field in the formData object is appended to the formData object,later we send it to the server
  formDataToSubmit.append('itemId', itemId); // Add the itemId reference
  formDataToSubmit.append('location',formData.location);
  formDataToSubmit.append('details',formData.details);
  formDataToSubmit.append('lostDate',formData.lostDate);
  formDataToSubmit.append('lostTime',formData.lostTime);
  if(formData.image){
    formDataToSubmit.append('image',formData.image);
  }

  
  
  //send the form data to the server
  try {
    const response = await axios.post('http://localhost:3000/api/claim', formDataToSubmit, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
      timeout: 5000,
  });
  
    setMessage(response.data.message);
    showAlert('success','successfully submitted your claim!');

    //call the function to update claims count in admin page
    updateClaimsCount(prevCount=>prevCount+1);
    
    fetchClaims();
  } catch (error) {
    if(error.response)
    {
      //server responded with a status other than 2xx
      console.error('Response Error',error.response.status,error.response.data);
    }
    else if(error.request){
      //Request was made but no response received
      console.error('Request Error',error.request);
    }
    else{
      //something else happend
      console.error('Error:',error.message);
    }
  }

  //scroll the page to top
  window.scrollTo({
    top:0,
    behavior:'smooth'//smooth scrolling animation
  });

  //set alert
  showAlert("success",'Successfully published');

  //perform validation and submission logic
  console.log('Form Submitted',formDataToSubmit);
};

//Fetch Claims when the componenet is mounted
useEffect(()=>{
  if(id && authtoken){
    fetchClaims();
  }
},[id,authtoken]);



console.log('Post Data',formData.postType);

  
  return (
    <>
    <Navbar/>
     {/* Alert Form Submited */}
    <Alert Alert={alert}/>
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
       type="text" 
       className="form-control" 
       name='location'
       id="exampleFormControlInput1" 
       placeholder="Location : Details location, where you lost the item."
       value={formData.location}
       onChange={(e)=>setFormData({...formData,location:e.target.value})}
       required 
       />
     </div>
     <div className={`mb-3 text-${textclr} `}id='form2'>
       <label form="formFile" className="form-label">Upload Image</label>
       <input 
       className="form-control"
       type="file"
       name="image" 
       id="formFile"
       onChange={handleFileChange}
       required
       />
     </div>
     <div className="mb-3" id='form3'>
       <textarea 
       className="form-control" 
       id="exampleFormControlTextarea1"
       name='details'
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
    name='lostDate'
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
    name='lostTime'
    placeholder="Lost Time" aria-label="Time"
    value={formData.lostTime}
    onChange={handleInputChange}
    required
    />
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
  </div>
      </form>
      {/* Display the submission message */}
      {message && <div className="alert alert-info mt-3">{message}</div>}
   </div>
 </>
  );
}