//component // Navbar
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adhar from '../assets/aadhaar-1.svg';
import { apiUrl } from '../api/api';
import axios from 'axios';


function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "Good Morning";
    } else if (hour < 16) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
}

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('UserId not available. Please log in.');
                    return;
                }

                const response = await axios.get(`${apiUrl}/user/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    const userData = response.data.user;
                    setUserName(userData.name);
                    console.log(userData.name);
                } else {
                    console.error('Failed to fetch user data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message || error);
            }
        };

        fetchUserData();

        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (time) => {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    };

    const handleLogout = async () => {

        // Clear authentication-related information in the frontend
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('designation');
        localStorage.removeItem('authenticated');

        // Redirect to the login page
        navigate('/login');
        window.history.replaceState(null, '', '/login');

        // Redirect to the login page

        // Disable the back button by using pushState with a new state
        window.history.pushState({ noBackExitsApp: true }, '');
        window.onpopstate = () => {
            if (!window.history.state) {
                window.history.pushState({ noBackExitsApp: true }, '');
            }
        };
    };


    return (
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold">{getPageName()}</h1>
            </div>
            <div className="flex items-center space-x-4">
                <img src={adhar} alt="Profile" className="w-8 h-8 rounded-full" />
                <div>
                    <p className="text-sm">{`${getGreeting()}, ${userName}`}</p>
                    <p className="text-xs">{formatTime(currentTime)} {currentTime.toLocaleDateString()}</p>
                </div>
                <button className="bg-blue-500 text-white py-1 px-2 rounded ml-2" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

const getPageName = () => {
    const path = window.location.pathname;
    switch (path) {
        case '/dashboard':
            return 'Dashboard';
        case '/upload':
            return 'Upload';
        case '/search':
            return 'Search';
        case '/profile':
            return 'Profile';
        case '/MIS':
            return 'MIS';
        case '/Pending':
            return 'Pending';
        case '/all':
            return 'All Users';
        case '/access-control':
            return 'Access Control';
        // Add more cases as needed
        default:
            return 'Unknown Page';
    }
};

export default Navbar;
