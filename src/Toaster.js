import React from 'react'
import "./Toaster.css"

const Toaster = (props) => {
    let {errorMessage} = props
  return (
    <div className='toaster-container' >
        
        <span className='toaster-text'>  {errorMessage} </span>
    </div>
  )
}

export default Toaster