// pages/AllUsers.jsx

import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { apiUrl } from '../api/api';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch(`${apiUrl}/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }


                const usersData = await response.json();
                console.log('All Users Data:', usersData);
                setAllUsers(usersData || []); // Ensure usersData is an array or default to an empty array

            } catch (error) {
                setError(error.message || 'Error fetching all users:', error);
            }
        };

        fetchAllUsers();
    }, []);

    const handleRoleChange = (index, value) => {
        setAllUsers((prevUsers) =>
            prevUsers.map((user, i) => (i === index ? { ...user, role: value } : user))
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <Menu />

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Navigation Bar */}
                <Navbar />

                {/* Main Components */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-2xl font-bold mb-4">All Users</h1>

                    {/* Table */}
                    <div className="overflow-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">SL No</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Designation</th>
                                    <th className="border px-4 py-2">Role</th>
                                    <th className="border px-4 py-2">Mobile No</th>
                                    <th className="border px-4 py-2">Employee ID</th>
                                    <th className="border px-4 py-2">Date Of Joining</th>
                                </tr>
                            </thead>

                            {error && <p className=" text-red-500">{error}</p>}

                            <tbody className='text-center'>
                                {allUsers.map((user, index) => (
                                    <tr key={user._id}>
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.designation}</td>
                                        <td className="border px-4 py-2">{user.role}</td>


                                        <td className="border px-4 py-2">{user.mobileNumber}</td>
                                        <td className="border px-4 py-2">{user.employeeID}</td>
                                        <td className="border px-4 py-2">{user.dateOfJoining}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
