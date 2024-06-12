import '../App.css';
import { useNavigate ,Link} from 'react-router-dom';
import { GlobalStateContext } from '../components/GlobalState';
import { useContext } from 'react';
import Darkmodebtn from '../components/Darkmodebtn';



const LoginPage = () => {
 
    
    const {mode} = useContext(GlobalStateContext);
console.log("login "+mode);
    return(
        // Main container
        <>
        <Darkmodebtn/>
      
      <div className="login-container">

     
  
            {/* //Login container */}
                    <div className={'row border rounded-3 p-4 shadow box-area mx-auto text-bg-'+mode}>
                {/* left box */}
                <div className="col-md-6 rounded-4 d-flex justify-content-center flex-column left-box " >
                  <div className="featured-image mt-2 d-flex">
                    <Link to="/">
                    <img src="../../public/logo.png" className='img-fluid' style={{width:'250px'}} />
                    {/* <img src="../../public/logo3.png" className='img-fluid' style={{width:'100px'}} /> */}
                    </Link>
                  </div>
                  <small className="text-white text-wrap text-center mb-2"
                  style={{
                    width:'20rem',
                    fontFamily:"'Courier New',Courier,monospace",
                  }}>
                    Search your lost item
                    </small>
                </div>
                {/* right box */}
                <div className="col-md-6 my-4 ">
                    <div className="row align-items mt-2 " >
                        <div className="input-group mb-3">
                            <input 
                            type="text" className='form-control form-control-lg bg-light fs=6' 
                            placeholder="Email Address"
                            />
                        </div>
                        <div className="input-group mb-1 ">
                            <input 
                            type="password" 
                            className='form-control form-control-lg bg-light fs=6' 
                            placeholder="Password"
                            />
                        </div>
                        <div className="input-group mb-5 d-flex justify-content-between">
                            <div className="form-check">
                            <input type="checkbox" className='form-check-input' id='formCheck'/>
                            <label form="formCheck" className="form-check-label text-secondary">
                                <small>Remember Me</small>
                            </label>
                            </div>
                            <div className="forget">
                                <small><a href="#">Forgot Password ?</a></small>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <button className='btn btn-lg btn-primary w-100 fs-6'>Login</button>
                        </div>
                        <div className="row">
                            <small>{`Don't have an account?`}
                            <Link to="/signup">Sign Up</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default LoginPage;
