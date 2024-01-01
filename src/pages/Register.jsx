// pages/Register.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import adhar from '/img/aadhaar-1.svg';
import { apiUrl } from '../api/api';
import axios from 'axios'; // Import Axios


const Register = () => {
    const navigate = useNavigate();
    const designation = ['Select Designation', 'DDG', 'Director', 'Deputy Director', 'Private Secretary', 'Section Officer', 'Assistant Section Officer', 'Project Manager', 'Assistant Manager', 'Assistant Manager-Compliance', 'MTO'];


    const [form, setForm] = useState({
        name: "",
        designation: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = form;

        // Trim the email and password values
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Check if email or password is blank
        if (!trimmedEmail || !trimmedPassword) {
            toast.error('Email and password cannot be blank', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
            });
            return;
        }


        try {
            const response = await axios.post(`${apiUrl}/register`, form, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            console.log('Server Response:', response);

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('authenticated', true);

                // Show success popup
                toast.success('Your Request has been Send to ADMIN', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // Navigate to the login page after a delay
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                // Handle other non-OK responses (e.g., 400 Bad Request)
                const errorData = response.data; // Assuming your server sends error details in the response body
                console.error('Registration failed. Server returned:', response.status, response.statusText, errorData);

                // Handle registration error, e.g., show an error message to the user
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 overflow-hidden">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <img
                        className="w-12 h-12 mr-2"
                        src={adhar}
                        alt="logo"
                    />
                    <a
                        href="#"
                        className="text-center flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >

                        <br />

                        Unique Identification Authority of India
                        <br />
                        Government of India (GoI)
                        <br />
                        USER REGISTRATION
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type="name"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Your name"
                                        required=""
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@uidai.net.in"
                                        required=""
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Designation:</label>
                                    <select
                                        name="designation"
                                        id="designation"
                                        onChange={handleChange}
                                        className="border rounded p-1 w-full"
                                    >
                                        {designation.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    className="w-full text-white bg-blue-700 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Create Account
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Register;
