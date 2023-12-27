//components>Menu.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="w-64 bg-gray-800 text-white hidden lg:block">
            <div className="p-4">
                {/* Dynamic page name based on the route */}
                <h1 className="text-2xl font-bold pt-5">{getPageName()}</h1>
            </div>
            <nav className="text-sm ">
                <ul className="space-y-2 p-4">
                    <li>
                        <Link to="/dashboard" className="block py-2 px-4 text-white hover:bg-gray-700">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="block py-2 px-4 text-white hover:bg-gray-700">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/search" className="block py-2 px-4 text-white hover:bg-gray-700">
                            Search
                        </Link>
                    </li>
                    <li>
                        <Link to="/all" className="block py-2 px-4 text-white hover:bg-gray-700">
                            All Users
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/access-control" className="block py-2 px-4 text-white hover:bg-gray-700">
                            Access Control
                        </Link>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
};

// Function to get the page name based on the route
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

export default Menu;
