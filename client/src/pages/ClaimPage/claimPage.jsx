import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../../components/Navbar';
import './ClaimPage.css';
import smartphoneImage from '../../../public/Categoryimages/smartphone.png'; // Ensure this path is correct
import { useContext, useEffect } from 'react';
import { GlobalStateContext } from '../../components/GlobalState';
import { useLocation, useNavigate } from 'react-router-dom';



export default function ClaimPage() {

  const location = useLocation();
  const navigate = useNavigate();
  const { textclr } = useContext(GlobalStateContext);
  const {Setprevpath} = useContext(GlobalStateContext);
  const {authtoken} = useContext(GlobalStateContext);

  //set previous path 
  Setprevpath(location.pathname);

  //check logged in or not,if not send to login page 
  useEffect(()=>{
  const gotologin=()=>{
    navigate('/login');
  }

  if(!authtoken)gotologin();
},[authtoken]);

  
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
     <div className="mb-3" id='form1'>
       <input type="location" className="form-control" id="exampleFormControlInput1" 
       placeholder="Location : Details location, where you lost the item." />
     </div>
     <div className={`mb-3 text-${textclr} `}id='form2'>
       <label form="formFile" className="form-label">Upload Image</label>
       <input className="form-control" type="file" id="formFile"/>
     </div>
     <div className="mb-3" id='form3'>
       {/* <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label> */}
       <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
       placeholder='Write details about the item that is yours'
       required>
       </textarea>
     </div>
     <div className="row" id='form4'>
  <div className="col">
    <input type="date" className="form-control" placeholder="Lost Date" aria-label="Date"/>
  </div>
  <div className="col">
    <input type="time" className="form-control" placeholder="Lost Time" aria-label="Time"/>
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
  </div>
   </div>
 </>
  );
}