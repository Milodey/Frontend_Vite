//component // Navbar
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adhar from '../assets/aadhaar-1.svg';
import { apiUrl } from '../api/api';

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
        // Fetch user information from the backend after login
        const fetchUserData = async () => {
            try {
                // Ensure userId is defined before making the request
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('UserId not available. Please log in.');
                    return;
                }

                const response = await fetch(`${apiUrl}/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    credentials: 'include', // Include credentials (cookies) in the request
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserName(userData.name);
                    console.log(userData.name);
                } else {
                    console.error('Failed to fetch user data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData(); // Fetch user data when the component mounts

        // Update current time every minute
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        // Cleanup interval when the component unmounts
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
        try {
            const response = await fetch(`${apiUrl}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                console.log('Logout successful');
            } else {
                console.error('Logout failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }

        // Clear authentication-related information in the frontend
        localStorage.removeItem('token');

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
