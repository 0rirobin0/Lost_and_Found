import '../App.css';
import { useNavigate, Link } from 'react-router-dom';
import { GlobalStateContext } from '../components/GlobalState';
import { useContext, useState } from 'react';
import Darkmodebtn from '../components/Darkmodebtn';
import axios from 'axios';
import Alert from '../components/Alert';




const LoginPage = () => {

    const navigate = useNavigate();
    // context variable 
    const { mode } = useContext(GlobalStateContext);
    const { alert, showAlert } = useContext(GlobalStateContext);
    const { authtoken, Setauthtoken } = useContext(GlobalStateContext);
    const {prevpath}= useContext(GlobalStateContext);

    const [userdata, Setuserdata] = useState({
        email: '',
        password: '',
    })

//  goto prevpath after login
const gotoprevpath = ()=>
{
    navigate(prevpath);
}







    // on change handler
    const onChange = (e) => {
        const { name, value } = e.target;
        Setuserdata(
            {
                ...userdata,
                [name]: value
            }
        )
    }


    // handle loginform submission
    const submitlogin = async (e) => {
        e.preventDefault();
        console.log("login");
        console.log(userdata);


        // ========================posting data to server

        try {
            const response = await axios.post('http://localhost:3000/api/user/login', userdata, {
                // headers: {
                //   'Accept': 'application/json, text/plain, */*',
                //   'Content-Type': 'application/json'
                // },
                timeout: 3000,
            });

            // getting auth token
            Setauthtoken(response.data);
            const userRole=response.data.role; // Assuming the role is returned in response


            console.log("auth-token : "+authtoken);
            console.log("user Role : "+userRole);

            // setalert Success 
            showAlert("success", ' Logged In SuccessFully');

            // goto previous path
             gotoprevpath();

             // Redirect based on the role
        if (userRole === 'admin') {
            navigate('/admin'); // Redirect to the admin page if user is admin
        } else {
            navigate('/profile'); // Redirect to the profile page for normal users
        }


            console.log(response);
        } catch (error) {
            // setalert error
            showAlert("danger", ' Logged In Failed check email or pass');



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







    console.log("login " + mode);
    return (
        // Main container
        <>
            <Darkmodebtn />
            <Alert alert={alert} />

            <div className="login-container">



                {/* //Login container */}
                <div className={'row border rounded-3 p-4 shadow box-area mx-auto text-bg-' + mode}>
                    {/* left box */}
                    <div className="col-md-6 rounded-4 d-flex justify-content-center flex-column left-box " >
                        <div className="featured-image mt-2 d-flex">
                            <Link to="/">
                                <img src="../../public/logo.png" className='img-fluid' style={{ width: '250px' }} />
                                {/* <img src="../../public/logo3.png" className='img-fluid' style={{width:'100px'}} /> */}
                            </Link>
                        </div>
                        <small className="text-white text-wrap text-center mb-2"
                            style={{
                                width: '20rem',
                                fontFamily: "'Courier New',Courier,monospace",
                            }}>
                            Search your lost item
                        </small>
                    </div>
                    {/* right box */}
                    <div className="col-md-6 my-4 ">
                        {/* login form */}

                        <form onSubmit={submitlogin}>



                            <div className="row align-items mt-2 " >
                                <div className="input-group mb-3">
                                    <input
                                        type="email" className='form-control form-control-lg bg-light fs=6'
                                        placeholder="Email"
                                        name='email'
                                        value={userdata.email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="input-group mb-1 ">
                                    <input
                                        type="password"
                                        className='form-control form-control-lg bg-light fs=6'
                                        placeholder="Password"
                                        name='password'
                                        value={userdata.password}
                                        onChange={onChange}
                                        required

                                    />
                                </div>
                                <div className="input-group mb-5 d-flex justify-content-between">
                                    <div className="form-check">
                                        <input type="checkbox" className='form-check-input' id='formCheck' />
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
                                        <Link to="/signup"><b>Sign Up </b></Link></small>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage;
