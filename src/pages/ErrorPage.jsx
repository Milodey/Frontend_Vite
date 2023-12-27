import React from 'react'
import { Link } from "react-router-dom";
import adhar from '../assets/aadhaar-1.svg';


const ErrorPage = () => {

    return (
        <div className='text-center'>
            <h1>404 - Page Not Found</h1>
            <p>The requested page does not exist.</p>
            <p>Thank you Visit again.</p>
            <div className='flex justify-center items-center'>
                <img src={adhar} alt="" className='w-8 h-8' />
            </div>




        </div>
    )
}

export default ErrorPage