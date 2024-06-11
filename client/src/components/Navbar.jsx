import React from 'react'
import Avatar from '../components/Avatar'
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
    let darkbtnimg = props.mode == 'dark' ? 'light' : 'night';
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }
    return (
        <nav className="navbar bg-body-tertiary fixed-top d-flex  " data-bs-theme={props.mode} >

            {/* logo */}
            <a className="navbar-brand" href="/">
                <img src="/logo.png" alt="logo" width="140px" className='mx-2 ' /></a>

            {/* right Nav */}


            <div className="container-rightnav d-flex justify-content-end">
               {/* Post Button */}
               <button type="button" className="btn btn-primary  px-4 py-2"><b>Post</b></button>
               
               
                {/* login button */}

                <button type="button" className="btn btn-danger mx-4 px-3 py-2" onClick={handleLoginClick}><b>Login</b></button>
                
                {/* Dark mode switch */}

                <div className="cotainer " >
                    <div className={'form-check form-switch d-flex justify-content-end my-2'} id='darkmodebtn'>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <img className='mx-2' src={'/' + darkbtnimg + '-mode.png'} width="25px" />
                    </div>
                </div>

                {/* Avatar */}
                <Avatar />
            </div>


        </nav>
    )
}
