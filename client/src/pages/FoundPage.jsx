import { useEffect, useState } from 'react';
import Navbar from '../../src/components/Navbar';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import smartphoneImage from '../../public/Categoryimages/smartphone.png';
import { useContext } from 'react';
import { GlobalStateContext } from '../components/GlobalState';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FoundPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const {textclr}=useContext(GlobalStateContext);
  const {Setprevpath}=useContext(GlobalStateContext);
  const {authtoken} =useContext(GlobalStateContext);

  //set previous path
  Setprevpath(location.pathname);

  //checked logged in or not,if not send to log in page
  useEffect(()=>{
    const gotologin=()=>{
      navigate('/login');
    }

    if(!authtoken)gotologin();
  },[authtoken,navigate]);

  // State for selected division and available districts
   const [selectedDivision, setSelectedDivision] = useState('');
   const [districts, setDistricts] = useState([]);

   const [formData, setFormData] = useState({
    itemName:'',
    category:'',
    division:'',
    district:'',
    date:'',
    time:'',
    details:'',
    rewardAmount: 0,
    image:null,
  });
  const [formValidation, setFormValidation] = useState({
    category:false,
    rewardAmount: false,
    division:false,
    district:false,
  });

  // categories
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


    // Division and districts data

  const divisions = {
    Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
    Chattogram: ["Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"],
    Rajshahi:  ["Bogura", "Joypurhat", "Naogaon", "Natore", "Chapai Nawabganj", "Pabna", "Rajshahi", "Sirajganj"],
    Khulna: ["Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
    Barishal: ["Barguna", "Barishal", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur"],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
    Mymensingh: ["Mymensingh", "Netrokona", "Sherpur", "Jamalpur"]
  };

  //managing the form data and sending it to a server
  const handleSubmit = async(e)=>{
    e.preventDefault();
    //combine date & time into found Date time
    const { date, time} = formData;

    // Debugging: Log the date and time
    console.log("Date:", date);
    console.log("Time:", time);

    //validate date and time now
    if(!date || !time)
    {
      console.error('Invalid date and time error');
      return;
    }

    // Combine date and time into a single valid Date string
    const combinedDateTime = `${date}T${time}:00`; // Adding seconds ':00' to ensure time is in HH:MM:SS format


    // Debugging: Log the combined date and time
    console.log("Combined DateTime:", combinedDateTime);

    // Create foundDateTime before validation
    const foundDateTime=new Date(`${date}T${time}`);

    //Check if the date is valid
    if(isNaN(foundDateTime.getTime())){
      console.error('Invalid Date');
      return;
    }
    

    //manual validation check
    if(!formData.category || !formData.district || !formData.image){
      setFormValidation((prev)=>({
        ...prev,
        category: !formData.category,
        district: !formData.district,
        image: !formData.image,
        rewardAmount: formData.rewardAmount<0 || formData.rewardAmount>500,
      }));
      return;
    }

     // Native form validation
  if (!e.target.checkValidity()) {
    e.target.reportValidity(); // This will display the validation error
    return;
  }

    //creates a FormData object to prepare the data for submission
    const formDataToSend=new FormData();

    //Each field in the formData object is appended to the FormData object, which will later be sent to a server
    formDataToSend.append('itemName',formData.itemName);
    formDataToSend.append('category',formData.category);
    formDataToSend.append('division',formData.division);
    formDataToSend.append('district',formData.district);
    if(formData.image){
      formDataToSend.append('image',formData.image);
    }
    formDataToSend.append('details',formData.details);
    formDataToSend.append('foundDateTime',foundDateTime.toISOString());
    formDataToSend.append('rewardAmount',formData.rewardAmount);
    formDataToSend.append('postTypes',formData.postTypes);


    //send the form data to the server
  try {
    const response = await axios.post('http://localhost:3000/api/post',formDataToSend,{
        headers:{
          'content-Type':'multipart/form-data',
        },
      });
      console.log(response);
      //if the submission is successful, navigate to the admin page
      if(response.status === 200 || response.status===201)
      {
        navigate('/admin');
      }
  } catch (error) {
    console.error('Error submitting form:',error);
  }

}

  // Handle division change
  const handleDivisionChange = (e) => {
    const division = e.target.value;
    setSelectedDivision(division);
    setDistricts(divisions[division] || []);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value ,files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if(name==='image')
    {
      const imageFile=files[0]; // Get the selected image file76
      setFormData((prevData)=>({
        ...prevData,
        image: imageFile , // Store the file in formData
      }))
    }

    // Example validation check for rewardAmount
    if (name === "rewardAmount" && (value < 0 || value > 500)) {
      setFormValidation((prevValidation) => ({
        ...prevValidation,
        rewardAmount: true,
      }));
    } else {
      setFormValidation((prevValidation) => ({
        ...prevValidation,
        rewardAmount: false,
      }));
    }
  };

  return (
    <>
    <Navbar/>
    <div className='row'>
      {/* left side */}
    <div className="form col-md-8 " style={{marginTop:'100px', marginLeft:'50px'}}>
      <form className="g-3" onSubmit={handleSubmit}>
      <input 
       type="text" 
       className="form-control" 
       id="exampleFormControlInput1" 
       placeholder="Item Name" 
       required
       />
       {/* catagory */}
    <div className="mt-3" >
        <select className={`form-select ${formValidation.category?'is-inValid':' '}`}
        id='category'
        name='category'
        value={formData.category}
        onChange={handleChange}
        required>
          <option value="" disabled>Choose...</option>
          {Categories.map((category)=>
          <option key={category} value={category}>{category}</option>
          )}
        </select>
        <div className="invalid-feedback">
          Please select a category.
        </div>
    </div>
    {/* Division and Districts */}
<div className="row mt-3">
  {/* division */}
  <div className="col">
    <select 
    className={`form-select ${!selectedDivision &&formValidation.division?'is-invalid':''}`}
    id='division'
    name='division'
    value={selectedDivision} 
    onChange={handleDivisionChange} 
    required >
    <option value="" disabled>Select Region</option>
    {Object.keys(divisions).map((division)=>(
      <option key={division} value={division}>{division}</option>
    ))}
    </select>
    <div className='invalid-feedback'>Please select a division.</div>
  </div>
  {/* district */}
  <div className="col">
    <select className={`form-select ${!formData.district && formValidation.district?'is-invalid':''}`} 
    id='district'
    name='district'
    value={formData.district || ""}
    onChange={handleChange}
    required>
    <option value=""  disabled>Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>{district}</option>
              ))}
      </select>
  </div>
</div>


<div className={`mb-3 text-${textclr}`} id='photo' >
      <label htmlFor="formFile" className="form-label">Upload Image</label>
      <input 
      className="form-control" 
      type="file" 
      id="formFile"
      name='image'
      onChange={handleChange}
      required/>
      <div className="invalid-feedback">
        please upload an image.
      </div>
</div>


<div className="mb-3">
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Write item details' required></textarea>
</div>

      {/* Date & Time */}
  <div className='row'>
    <div className="col-md-6">
     <input 
     type="date" 
     className="form-control" 
     aria-label="Date"
     name='date'
     value={formData.date}
     onChange={handleChange}
     required/>
    </div>

    <div className="col-md-6">
      <input 
      type="time" 
      className="form-control"
      aria-label="Time"
      name='time'
      value={formData.time}
      onChange={handleChange}
      required/>
    </div>
  </div>
            {/* reward */}
      <div className={`mt-3 text-start text-${textclr}`}>
            <label htmlFor="rewardAmount" className="form-label">
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
      <div className='mt-3 text-center'>
        <button className={`btn btn-primary rounded-pill text-${textclr}`} type='submit'><b>Submit</b></button>
      </div>
    </form>
      
</div>


    {/* right side card */}
    <div className="card col-md-4 d-flex justify-content-center align-items-center  " style={{ maxWidth: '300px',marginTop:'50px', marginLeft:'70px',background: 'transparent', border: 'none' }} id='card'>
          <div className="col-md-4 " >
            <img src={smartphoneImage} className="img-fluid rounded-start" alt="Smartphone" />
          </div>
          <div className={`col-md-8 text-${textclr}`}>
            <div className="card-body" >
              <h6 className="card-title">Samsung S22</h6>
              <p className="card-text">
                <FontAwesomeIcon icon={faLocationDot} /> Dhaka
              </p>
              <p className="card-text">
                25th May at 2:30 pm
              </p>
            </div>
          </div>
      </div>
    </div>
    </>
  );
}