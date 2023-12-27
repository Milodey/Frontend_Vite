import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { apiUrl } from '../api/api';

const Pending = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [error, setError] = useState(null);

    const fetchPendingUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/pendinguser`, {
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

            const data = await response.json();
            setPendingUsers(data);
        } catch (error) {
            setError(error.message || 'An error occurred while fetching pending users.');
        }
    };

    const handleAccept = async (userId) => {
        try {
            const response = await fetch(`${apiUrl}/accept/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            fetchPendingUsers();
        } catch (error) {
            setError(error.message || 'An error occurred while accepting the user.');
        }
    };

    const handleReject = async (userId) => {
        try {
            const response = await fetch(`${apiUrl}/reject/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            fetchPendingUsers();
        } catch (error) {
            setError(error.message || 'An error occurred while rejecting the user.');
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <Menu />

            <div className="flex-1 p-8">
                {/* Navigation Bar */}
                <Navbar />

                {/* Main Components */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-2xl font-bold mb-4">Pending for Approval</h1>

                    {/* Table */}
                    <div className="overflow-y-auto max-h-96">
                        {error ? (
                            <p className=" text-red-500">{error}</p>
                        ) : pendingUsers.length === 0 ? (
                            <p>No pending users</p>
                        ) : (
                            <table className="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">SL No</th>
                                        <th className="border px-4 py-2">Name</th>
                                        <th className="border px-4 py-2">Email</th>
                                        <th className="border px-4 py-2">Designation</th>
                                        <th className="border px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingUsers.map((user, index) => (
                                        <tr key={user._id} className='text-center'>
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{user.name}</td>
                                            <td className="border px-4 py-2">{user.email}</td>
                                            <td className="border px-4 py-2">{user.designation}</td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    className="bg-green-500 text-white px-2 py-1 mr-2"
                                                    onClick={() => handleAccept(user._id)}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1"
                                                    onClick={() => handleReject(user._id)}
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pending;
