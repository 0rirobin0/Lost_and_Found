
import { GlobalStateContext } from '../components/GlobalState';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SignupPage.css';
import Darkmodebtn from '../components/Darkmodebtn';
import { useContext } from 'react';


const SignupPage=()=> {
    const {mode} = useContext(GlobalStateContext);
    console.log("signup "+mode);
  return (
        
            // Main container
            <>
            <Darkmodebtn/>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      {/* Main container */}
      <div className="row border rounded-5 p-3 bg-white shadow box-area mx-auto">
        <div className="col-lg-6 mt-5">
          <p>Create your account</p>
          <div className="row align-items-center mt-2">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Username"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
              <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Email"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
              <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Password"
              />
            </div>
            <div className="input-group mb-3 justify-content-center">
              <span className="input-group-text">
              <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Confirm Password"
              />
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
            <div className="input-group mb-5">
              <button className="btn btn-lg btn-primary w-100 fs-6">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SignupPage;