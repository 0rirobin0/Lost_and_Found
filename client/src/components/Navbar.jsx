import React, { useContext } from 'react'
import Avatar from '../components/Avatar'
import { useNavigate } from 'react-router-dom';
import Darkmodebtn from './Darkmodebtn';
import { GlobalStateContext } from './GlobalState';

export default function Navbar(props) {
   
    const {mode} = useContext(GlobalStateContext);


    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }
    return (
        <nav className="navbar bg-body-tertiary fixed-top d-flex  " data-bs-theme={mode} >

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

                <Darkmodebtn />

                {/* Avatar */}
                <Avatar />
            </div>


        </nav>
    )
}
