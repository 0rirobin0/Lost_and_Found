import { GlobalStateContext } from '../../components/GlobalState'
import { faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SignupPage.css';
import Darkmodebtn from '../../components/Darkmodebtn';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';




const SignupPage = () => {


  const [confirmpassword, Setconfirmpassword] = useState('');
  const [userdata, Setuserdata] = useState({

    username: '',
    email: '',
    phone: '',
    password: '',


  });
  // navigation
  const Navigate = useNavigate();
  const { mode } = useContext(GlobalStateContext);

  const gotohome = () => {
    Navigate('/');
  }

  // on change data
  const onchange = (e) => {
    const { name, value } = e.target;
    Setuserdata(
      {
        ...userdata,
        [name]: value
      }
    );

   





  }

  const confirmpasswordOnchange = (e) => {
    Setconfirmpassword(e.target.value);

  }

  // Handle form validation
  const [formValidation, setFormValidation] = useState({
    isvalidusername: true,
    isvalidephone: true,
    isvalidpassword: true,


  });










  // submit form 
  const SubmitUserdata = async (e) => {
    e.preventDefault();
    console.log(userdata);
    console.log('confirm pass : ' + confirmpassword);



 // Perform validation and submission logic here

 let isValidUsername = true;
 let isValidPassword = true;




 // Checking username
 for (let i = 0; i < userdata.username.length; i++) {
  const char = userdata.username[i];
  if (!(
      (char >= 'a' && char <= 'z') ||
      (char >= 'A' && char <= 'Z') ||
      (char >= '0' && char <= '9') ||
      char === '_'
  )) {
      isValidUsername = false;
      break; // Exit loop as soon as an invalid character is found
  }
}

// Checking confirm password is match and length requirement
if (userdata.password !== confirmpassword || userdata.password.length < 6) {
  isValidPassword = false;
}

// Setting form validation state once
setFormValidation({
  ...formValidation,
  isvalidusername: isValidUsername,
  isvalidpassword: isValidPassword,
});

// ========================posting data to server

try {
  const response = await axios.post('http://localhost:3000/api/user/register', userdata, {
    // headers: {
    //   'Accept': 'application/json, text/plain, */*',
    //   'Content-Type': 'application/json'
    // },
    timeout: 3000,
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












  }













  return (

    <>
      <Darkmodebtn />

      <div className="cotainer d-flex " id='signup-container'>

        <img src="../../public/logo.png" className='img-fluid mx-3' id='Signup-logo' onClick={gotohome} style={{ width: '250px' }} />


        {/* Main container */}
        <div className={'row border rounded-3  shadow box-area mx-auto text-bg-' + mode} id='Signup-boxarea'>

          <div className="col-lg-6 mt-5">
            <p>Create your account</p>

            <div className="row align-items-center mt-2">
              <form on onSubmit={SubmitUserdata}>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  {/* username */}
                  <input
                    name='username'
                    value={userdata.username}
                    type="text"
                    onChange={onchange}

                    className={formValidation.isvalidusername == false ? 'form-control form-control-lg bg-light fs-6 is-invalid' : 'form-control form-control-lg bg-light fs-6 '}

                    placeholder="Username"
                    required
                  />
                  <div className={'invalid-feedback'}>
                    Only letters (uppercase and lowercase), numbers, and underscores are allowed.
                  </div>
                  
                
                </div>
                {/* email */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <input
                    name='email'
                    type="email"
                    value={userdata.email}
                    onChange={onchange}
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  {/* phone number */}
                  <input
                    name='phone'
                    type="tel"
                    value={userdata.phone}
                    onChange={onchange}
                    className={'form-control form-control-lg bg-light fs-6'}
                    placeholder="017XXXXXXXX"
                    maxLength="11"
                    required
                  />
                  
                </div>
                {/* password */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    name='password'
                    type="password"
                    value={userdata.password}
                    onChange={onchange}

                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="input-group mb-3 justify-content-center">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    name='confirmpassword'
                    type="password"
                    value={confirmpassword}
                    onChange={confirmpasswordOnchange}
                    className={formValidation.isvalidpassword== false ? 'form-control form-control-lg bg-light fs-6 is-invalid' : 'form-control form-control-lg bg-light fs-6 '}
                    placeholder="Confirm Password"
                    required
                  />
                   <div className={'invalid-feedback'}>
                   Confirm Password didn't match! Or Check Password length is more than 6 charecter!
                  </div>
                </div>
                <div className="input-group mb-5 d-flex justify-content-between">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="formCheck" />
                    <label htmlFor="formCheck" className="form-check-label text-secondary">
                      <small>Remember Me</small>
                    </label>
                  </div>
                  <div className="forget">
                    <small><a href="#">Forgot Password ?</a></small>
                  </div>
                </div>
                <div className="row my-2">
                  <small>{`Already have an account?`}
                    <Link to="/login"> <b>Login</b></Link></small>
                </div>
                <div className="input-group mb-5">
                  <button

                    className="btn btn-lg btn-primary w-100 fs-6">


                    Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage;