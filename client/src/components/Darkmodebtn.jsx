import React,{useContext} from 'react'
import { GlobalStateContext } from './GlobalState';

export default function darkmodebtn() {
    
    const {mode,toggleMode} = useContext(GlobalStateContext);
    let darkbtnimg = mode == 'dark' ? 'light' : 'night';
  return (
    <div className="cotainer " >
    <div className={'form-check form-switch d-flex justify-content-end my-2'} id='darkmodebtn'>
        <input className="form-check-input" onClick={toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={mode === 'dark'}
 />
        <img className='mx-2' src={'/' + darkbtnimg + '-mode.png'} width="25px" />
    </div>
</div>
  )
}
