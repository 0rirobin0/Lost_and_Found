import React from 'react'
import Avatar from '../components/Avatar'

export default function Navbar(props) {
    let darkbtnimg = props.mode == 'dark' ? 'light' : 'night';

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top py-0 " data-bs-theme={props.mode} >
            <div className="container-fluid">

                <a className="navbar-brand" href="/">
                    <img src="/logo.png" alt="logo" width="140px" className='mx-2 ' /></a>

                <div className="container-rigtnav d-flex justify-content-end">
                    {/* login button */}
                    <button type="button" className="btn btn-danger mx-4">Login</button>
                    {/* Dark mode switch */}

                    <div className="cotainer " >
                        <div className={'form-check form-switch d-flex justify-content-end my-2'} id='darkmodebtn'>
                            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <img className='mx-2' src={'/' + darkbtnimg + '-mode.png'} width="25px" />
                        </div>
                    </div>

                    {/* Avater */}
                    <Avatar />
                </div>

            </div>
        </nav>
    )
}
